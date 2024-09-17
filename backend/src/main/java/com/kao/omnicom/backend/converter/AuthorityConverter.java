package com.kao.omnicom.backend.converter;

import com.kao.omnicom.backend.enumeration.Authorities;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class AuthorityConverter implements AttributeConverter<Authorities, String> {

    @Override
    public String convertToDatabaseColumn(Authorities authorities) {
        if (authorities == null) return null;

        return authorities.getValue();
    }

    @Override
    public Authorities convertToEntityAttribute(String s) {
        if (s == null) return null;

        return Stream.of(Authorities.values())
                .filter(authorities -> authorities.getValue().equals(s))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }

}
