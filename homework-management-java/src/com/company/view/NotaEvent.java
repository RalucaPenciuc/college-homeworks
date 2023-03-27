package com.company.view;

import com.company.domain.Nota;

public class NotaEvent implements Event {
    private Nota oldData;
    private Nota data;
    private ChangeEventType type;

    public NotaEvent(Nota oldData, Nota data, ChangeEventType type) {
        this.oldData = oldData;
        this.data = data;
        this.type = type;
    }

    public Nota getOldData() { return oldData; }

    public void setOldData(Nota oldData) { this.oldData = oldData; }

    public Nota getData() { return data; }

    public void setData(Nota data) { this.data = data; }

    public ChangeEventType getType() { return type; }

    public void setType(ChangeEventType type) { this.type = type; }
}
