package utils;


import model.CazCaritabil;

public class CazCaritabilEvent implements Event{
    private CazCaritabil oldData;
    private CazCaritabil data;
    private ChangeEventType type;

    public CazCaritabilEvent(CazCaritabil oldData, CazCaritabil data, ChangeEventType type) {
        this.oldData = oldData;
        this.data = data;
        this.type = type;
    }

    public CazCaritabil getOldData() {
        return oldData;
    }

    public void setOldData(CazCaritabil oldData) {
        this.oldData = oldData;
    }

    public CazCaritabil getData() {
        return data;
    }

    public void setData(CazCaritabil data) {
        this.data = data;
    }

    public ChangeEventType getType() {
        return type;
    }

    public void setType(ChangeEventType type) {
        this.type = type;
    }
}
