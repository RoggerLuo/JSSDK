import { Model } from 'dvax';

const nowDate = new Date();
const model = {
    namespace: 'subject',
    state: { 
        isClassTeacher: false,
        isToday: true,
        isPickerOpen: false,
        year: nowDate.getFullYear(),
        month: nowDate.getMonth()+1,
    } 
};

Model.create(model);