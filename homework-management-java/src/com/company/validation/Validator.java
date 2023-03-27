package com.company.validation;

public interface Validator<E> {
    void validate(E entity) throws ValidationException;
}