"use client";

import React, { useState } from "react";
import "react-international-phone/style.css";

import areaCodeList from "@/utils/areaCodeList";
import { InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material";
import { defaultCountries, FlagImage, parseCountry, usePhoneInput } from "react-international-phone";

export default function PhoneInput({
  value,
  onChange,
  error,
  helperText,
  isReceiver,
  countryCodeEditable = true,
  onlyNorthAmerica = false,
  ...restProps
}) {
  const [selectedState, setSelectedState] = useState(null);

  // Filter for US and Canada if onlyNorthAmerica is true
  const allowedCountries = onlyNorthAmerica
    ? defaultCountries.filter((c) => {
        const country = parseCountry(c);
        return country.iso2 === "us" || country.iso2 === "ca";
      })
    : defaultCountries;

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: "us",
    value,
    countries: allowedCountries,
    onChange: (data) => {
      // If onlyNorthAmerica is true, enforce +1 country code
      if (onlyNorthAmerica && !data.phone.startsWith("+1")) {
        return; // Simply ignore the change, but don't call onChange
      }

      const isCode = data.phone.match(/^\+1(\d{3})/);

      if (isCode) {
        const areaCode = Number(isCode[1]);
        const stateElement = areaCodeList.find((el) => el.areaCode.includes(areaCode));

        // Avoid unnecessary re-renders, only change state if necessary
        if (stateElement && stateElement.country.toLowerCase() !== country.iso2) {
          setTimeout(() => setCountry(stateElement.country.toLowerCase()), 0);
        }

        if (stateElement && (!selectedState || selectedState.state !== stateElement.state)) {
          setSelectedState({ state: stateElement.state, country: stateElement.country });
        } else if (!stateElement && selectedState) {
          setSelectedState(null);
        }
      }

      if (data.phone !== value) {
        onChange(data.phone);
      }
    },
  });

  // Custom handler to prevent editing the +1 prefix when onlyNorthAmerica is true
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (!onlyNorthAmerica || newValue.startsWith("+1")) {
      handlePhoneValueChange(e);
    }
  };

  return (
    <TextField
      variant="outlined"
      label={isReceiver ? (selectedState ? `Fax # ${selectedState?.country} - (${selectedState?.state})` : `Fax #`) : "Phone"}
      color="primary"
      placeholder={isReceiver ? "US/Canada Fax number" : "Phone number"}
      value={inputValue}
      onChange={handleInputChange}
      type="tel"
      required
      inputRef={inputRef}
      error={error}
      helperText={helperText}
      size="small"
      sx={{
        fontSize: "14px",
        "& .MuiInputBase-input": {
          fontSize: "14px",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" style={{ marginRight: "2px", marginLeft: "-8px" }}>
            <Select
              aria-label={isReceiver ? "Select country code for fax number" : "Select country code for phone number"}
              inputProps={{ 
                'aria-label': isReceiver ? "Country code selector for fax" : "Country code selector for phone"
              }}
              MenuProps={{
                style: {
                  height: "300px",
                  width: "360px",
                  top: "10px",
                  left: "-34px",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
              sx={{
                width: "max-content",
                fieldset: {
                  display: "none",
                },
                '&.Mui-focused:has(div[aria-expanded="false"])': {
                  fieldset: {
                    display: "block",
                  },
                },
                ".MuiSelect-select": {
                  padding: "8px",
                  paddingRight: "24px !important",
                },
                svg: {
                  right: 0,
                  display: countryCodeEditable ? "block" : "none",
                },
              }}
              value={country.iso2}
              onChange={(e) => setCountry(e.target.value)}
              renderValue={(value) => <FlagImage iso2={value} style={{ display: "flex" }} />}
              disabled={!countryCodeEditable}
            >
              {allowedCountries.map((c) => {
                const country = parseCountry(c);
                return (
                  <MenuItem key={country.iso2} value={country.iso2}>
                    <FlagImage iso2={country.iso2} style={{ marginRight: "8px" }} />
                    <Typography marginRight="8px">{country.name}</Typography>
                    <Typography color="gray">+{country.dialCode}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </InputAdornment>
        ),
      }}
      {...restProps}
    />
  );
}
