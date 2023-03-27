package com.company.view;

public interface Observer<E extends Event> {
    void update(E e);
}
