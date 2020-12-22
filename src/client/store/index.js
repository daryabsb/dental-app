// import axios from '@nuxtjs/axios';
// import conf from './conf';
const state = () => ({
    users: [],
    patients: [],
    patient: [],
    treatments: [],
    appointments: [],
    allAppointments: [],
    attachments: [],
    curTreats: [],
    patientPdfFiles: [],
    hasPDF: false,
    hasIMAGES: false,
    patientImageFiles: [],
    files: [],
    csrftoken: "",
    progress: 0,
    isImageUploadOpen: false,
    patientHasImage: false,
    pid: 0,
    counter: null,
    alertMsg: '',
    alertStatus: true,
    /* 
    TEMPORARILY HOLDS 
    CURRENT PATIENT's IMAGE*/
    pimage: '',
    currentPatient: {
        name: 'darya',
        doctor: 1,
        dob: "",
        gender: null,
        description: "",
        phone: "",
        email: "",
        status: true,

        examinations: {
            skeletal_class: null,
            nasolabial_angle: null,
            nasolabial_sulcus: null,
            lip_competency: null,
            face_form: null,
            molar_class_left: null,
            molar_class_right: null,
            midline_upper: null,
            midline_lower: null,
            overjet: "",
            oral_hygiene: null,
            treatment_plan: "",
            slot: "",
            treated_arch: null,
            bracket_system: null,
            extraction_upper: null,
            extraction_lower: null,
            anchorage_upper: null,
            tongue_size: '',
            habit: ''
        },
        medicals: {
            physical_restrictions: "75",
            sinus_infections: "75",
            diabetes: "75",
            heart_problem: "75",
            kidney_illness: "75",
            emotional_difficulties: "75",
            other_diseasses: ""
        }
    },

});

// const modules = {
//     conf
// }

const mutations = {
    GET_PATIENTS(state, payload) {
        state.patients = payload;
    },
    SET_PATIENT_DATA(state, payload) {

        // console.log(payload[2]);
        state.patientPdfFiles = [];
        state.hasPDF = false;
        state.hasIMAGES = false;
        state.patientImageFiles = [];

        state.patient = payload[0];

        if (payload[0].image != '') {
            state.patientHasImage = true;

        }

        if (payload[1].length != 0) {
            state.hasPDF = true;
        }
        if (payload[2].length != 0) {
            state.hasIMAGES = true;
            // state.patientImageFiles = payload[2];

        }
        // // let list = []
        // this.patientImageFiles.forEach(pdf => console.log(pdf) /*list.push(pdf)*/ );



        // console.log(state.patient);
    },
    'SET_PATIENT_PDFS' (state, payload) {
        state.patientPdfFiles = payload;
    },
    GET_USERS(state, payload) {
        // console.log(payload)
        state.users = payload;
    },
    GET_TREATMENTS(state, payload) {
        state.treatments = payload;
    },

    GET_ATTACHMENTS(state, payload) {
        state.attachments = payload;
    },
    GET_APPOINTMENTS(state, payload) {

        state.appointments = payload;
        // console.log(state.appointments);
    },
    GET_ALL_APPOINTMENTS(state, payload) {
        state.allAppointments = payload;
    },
    GET_PATIENT_TREATMENTS(state, id) {
        // console.log(state.treatments)
        state.curTreats = state.treatments.filter(treat => treat.patient === id);
    },
    // 'GET_PATIENT_TREATS' (state, payload) {
    //     const curPatient = state.patients
    //         .filter(patient => patient.id === payload.id)
    //     state.curTreats = curPatient.treatments
    //     console.log(state.curTreats)
    // },
    ADD_USER(state, payload) {
        state.users.unshift(payload);
    },
    ADD_PATIENT(state, payload) {
        state.patients.results.unshift(payload);
        // state.counter = 3
        // console.log('From Payload: ', payload);
        // console.log('From state: ', state.patients);
    },
    ADD_NEW_APPOINTMENT(state, payload) {
        let patient = state.patients.results.find(p => p.id === payload.patient);
        let today = new Date();
        // console.log('payload for all', payload)
        // console.log('Find the appointment')

        // console.log()
        if (Date.parse(payload.date) >= Date.parse(today)) {
            state.appointments.results.unshift(payload);
            // state.allAppointments.unshift(payload);
        }


    },
    ADD_NEW_ALL_APPOINTMENT(state, payload) {
        state.allAppointments.unshift(payload)
    },
    EDIT_APPOINTMENT(state, payload) {
        let app = state.appointments.results.find(a => a.id === payload.id)
        let apple = state.allAppointments.find(a => a.id === payload.id)


        let appIndex = state.appointments.results.indexOf(app);
        let appAllIndex = state.allAppointments.indexOf(apple);
        state.appointments.results.splice(appIndex, 1, payload);
        state.allAppointments.splice(appAllIndex, 1, payload);
    },
    EDIT_USER(state, payload) {
        // FIND ITEM AND PLACE IN STATE
        const editedUser = state.users.find(user => user.id === payload.id);
        let indexOfUser = state.users.indexOf(editedUser);

        // REPLACE EDITED ITEM WITH NEW INFO
        state.users.splice(indexOfUser, 1, payload);
    },
    EDIT_PATIENT(state, payload) {
        // FIND ITEM AND PLACE IN STATE
        const editedPatient = state.patients.find(
            patient => patient.id === payload.id
        );
        let indexOfPatient = state.patients.indexOf(editedPatient);

        // REPLACE EDITED ITEM WITH NEW INFO
        state.patients.splice(indexOfPatient, 1, payload);
    },
    DELETE_ITEM(state, payload) {
        let item = payload.module.find(item => item.id === payload.id);
        let indexOfModule = payload.module.indexOf(item);
        // console.log(patient, indexOfPatient);

        payload.module.splice(indexOfModule, 1);
    },
    DELETE_PATIENT(state, id) {
        let patient = state.patients.find(patient => patient.id === id);
        let indexOfPatient = state.patients.indexOf(patient);
        // console.log(patient, indexOfPatient);

        state.patients.splice(indexOfPatient, 1);
    },
    DELETE_APPOINTMENT(state, id) {
        let appointment = state.appointments.results.find(app => app.id === id);

        let indexOfAppointmernt = state.appointments.results.indexOf(appointment);
        let indexOfAllAppointmernt = state.allAppointments.indexOf(appointment);
        // console.log(patient, indexOfPatient);

        state.appointments.results.slice(indexOfAppointmernt, 1);
        state.allAppointments.slice(indexOfAllAppointmernt, 1);
    },
    PUSH_NEW_FILES(state, payload) {
        state.files.push(payload);
    },
    REMOVE_ATTACHED_FILE(state, id) {
        let fileToFind = state.files.find(file => file.id === id);
        let indexOfFile = state.files.indexOf(fileToFind);
        state.files.splice(indexOfFile, 1);
    },

    /* THIS WILL TRIGGER THE ALERT */
    'SHOW_ALERT_COUNTER' (state, counter) {
        state.counter = counter;
    },
    'TRIGGER_ALERT' (state, alertBoard) {
        state.counter = 3;
        state.alertMsg = alertBoard.msg;
        state.alertStatus = alertBoard.status;
    },

    /* CHECK THE CODE BELOW*/
    ADD_NEW_TREATMENT(state, payload) {
        state.treatments.results.unshift(payload);
        state.treatments.results[0].files = [];
        state.treatments.results[0].files = state.files;
        state.files = [];
        // console.log(payload)
    },
    PATIENT_PDF_FILES(state, payload) {
        state.patientPdfFiles = payload;
    },
    PATIENT_IMAGE_FILES(state, payload) {
        state.patientImageFiles = payload;
    },
    'SET_PATIENT_ID' (state, payload) {
        state.pid = payload;
    },
    'SET_PIMAGE' (state, image) {
        state.pimage = image;
    },
    PUSH_IMAGE(state, payload) {

        // console.log(payload);
        // let patient = state.patients.find(p => p.id === payload.id)
        state.pimage = payload.image;
        // let indexOfPatient = state.patients.indexOf(patient)
        // console.log(state.patient[indexOfPatient])
        // state.patients.splice(indexOfPatient, 1, patient)
    },
    updateUploadProgress(state, payload) {
        state.progress = payload;
    },
    toggleImageUploadOpen(state) {
        state.isImageUploadOpen = !state.isImageUploadOpen
    },
    updateCurrentPatient(state, payload) {
        state.currentPatient = payload;
    }
};



const actions = {

    // async nuxtServerInit({ state, commit }, { req }) {

    //     console.log('Wait a second')
    // },



    async loadData({ state, commit }) {
        //state.csrftoken = app.$cookiz.get('csrftoken');
        // console.log('OnLoad: this will run regardless of login with 0, ', payload);

        let patientUrl = "/patients/";
        let treatmentUrl = "/treatments/";
        let usersUrl = "/users/";
        let appointmentUrl = "/appointments/";
        let allAppointmentUrl = "/appointments/?page_size=100";
        let attachmentsUrl = "/attachments/";
        console.log(allAppointmentUrl);

        try {
            const allPatients = await this.$axios.get(patientUrl);
            const allTreatments = await this.$axios.get(treatmentUrl);
            const allUsers = await this.$axios.get(usersUrl);
            const appointmentsData = await this.$axios.get(appointmentUrl);
            const allAppointmentsData = await this.$axios.get(allAppointmentUrl);
            const allAttachments = await this.$axios.get(attachmentsUrl);

            commit("GET_PATIENTS", allPatients.data);
            commit("GET_USERS", allUsers.data);
            commit("GET_TREATMENTS", allTreatments.data);
            commit("GET_APPOINTMENTS", appointmentsData.data);
            commit("GET_ALL_APPOINTMENTS", allAppointmentsData.data.results);
            commit("GET_ATTACHMENTS", allAttachments.data);
            //   console.log(allPatients.data)

        } catch (err) {
            console.log(err);
        }
    },
    async loadPatientData({ state, commit }, id) {

        console.log('Function is loaded and the ID is: ', id);
        commit('SET_PATIENT_ID', id)
        let patientsURL = '/patients'
        let attachmentsURL = '/attachments'


        try {
            let singlePatient = await this.$axios.$get(`${patientsURL}/${id}/`);
            let singlePatientPdfs = await this.$axios.$get(`${attachmentsURL}/?p=${id}&type=pdf`);
            let singlePatientImages = await this.$axios.$get(`${attachmentsURL}/?p=${id}&type=image`);

            // let thisPatient = {}
            let thisPatient = []

            thisPatient = await Promise.all([singlePatient, singlePatientPdfs, singlePatientImages]);
            // console.log(thisPatient)
            commit('SET_PATIENT_DATA', thisPatient);


        } catch (err) {
            console.log(err);
        }




    },
    async loadPatientPdfs({ state, commit }) {

        let id = state.pid;
        let attachmentsURL = '/attachments'


        try {

            let singlePatientPdfs = await this.$axios.$get(`${attachmentsURL}/?p=${id}&type=pdf`);

            commit('SET_PATIENT_PDFS', singlePatientPdfs.data);


        } catch (err) {
            console.log(err);
        }




    },

    async onChangePagination({ state, commit }, payload) {

        let url = `/${payload.module.toLowerCase()}/${payload.param}`
        const response = await this.$axios.get(url);
        commit(`GET_${payload.module}`, response.data);
    },
    async addUser({ state, commit }, payload) {
        // console.log('Payload: ', payload)
        const options = {
            headers: {
                "Content-Type": "multipart/form-data"
                    // "X-CSRFToken": state.csrftoken
            }
        };
        let url = "/user/create/";
        // console.log(url);

        try {
            const newUser = await this.$axios.post(url, payload, options);
            // console.log(allPatients.data)
            commit("ADD_USER", newUser.data);
            console.log("Created: ", newUser.data);
        } catch (err) {
            console.log(err);
        }
    },
    async editUser({ state, commit }, payload) {
        const id = payload.id;

        // console.log(payload.id)

        let url = `/users/${id}/`;
        // console.log(url);

        try {
            const newUser = await this.$axios.put(url, payload);
            //console.log("Updated Response: ", newPatient.data)

            commit("EDIT_USER", newUser.data);
            //   console.log(allPatients.data)
        } catch (err) {
            console.log(err);
        }
    },
    async addPatient({ state, commit, dispatch }, { vm, payload }) {

        let url = "/patients/";

        try {
            const newPatient = await this.$axios.post(url, payload);
            commit("ADD_PATIENT", newPatient.data);
            let alertBoard = {
                    status: true,
                    msg: 'You have successfully added a new patient!'
                }
                // commit('TRIGGER_ALERT', alertBoard)
            dispatch("makeToast", {
                variant: 'success',
                vm: vm,
                module: 'Patient'
            });


        } catch (err) {

            console.log(err);
            dispatch("makeToast", {
                variant: 'danger',
                vm: vm,
                module: 'Patient'
            })

        }

    },
    async editPatient({ state, commit }, payload) {
        const id = payload.id;

        let url = `/patients/${id}/`;
        // console.log(url);
        console.log('From edit patient payload: ', payload);
        try {
            const newPatient = await this.$axios.put(url, payload);

            commit("EDIT_PATIENT", newPatient.data);
        } catch (err) {
            console.log(err);
        }
    },
    updateCurrentPatientState({ state, commit }, payload) {
        commit('updateCurrentPatient', payload)
    },
    async onDelete({ state, commit }, payload) {
        // console.log('moduleName: ', payload.moduleName)
        // console.log('module: ', payload.module)
        // console.log('id: ', payload.id)

        try {
            await this.$axios.delete(
                `/${payload.moduleName}/${payload.id}/`
            );
            commit("DELETE_ITEM", payload);
        } catch (error) {
            console.log(error);
        }
    },
    async onDeleteUser({ state, commit }, id) {
        try {
            await this.$axios.delete(`/patients/${id}/`);
            commit("DELETE_PATIENT", id);
        } catch (error) {
            console.log(error);
        }
    },

    async onDeletePatient({ state, commit }, id) {
        try {
            await this.$axios.delete(`/patients/${id}/`);
            commit("DELETE_PATIENT", id);
        } catch (error) {
            console.log(error);
        }
    },
    async onDeleteAppointment({ state, commit }, id) {

        try {
            await this.$axios.delete(`/appointments/${id}/`);
            commit("DELETE_APPOINTMENT", id);
            console.log('event deleted')
        } catch (error) {
            console.log(error);
        }
    },
    async onUploadFile({ state, commit }, payload) {
        try {
            let url = "/attachments/";

            let res = await this.$axios.post(url, payload);
            // console.log(res.data)
            commit("PUSH_NEW_FILES", res.data);
        } catch (error) {
            console.log(error);
        }
    },
    async deleteAttached({ state, commit }, id) {
        let url = `/attachments/${id}/`;
        // console.log(url);
        try {
            await this.$axios.delete(url);

            commit("REMOVE_ATTACHED_FILE", id);
        } catch (error) {
            console.log(error);
        }
    },
    async addNewTreatment({ state, commit }, payload) {
        let url = "/treatments/";
        // console.log(payload)
        try {
            // console.log(Array.from(payload));
            const newTreatment = await this.$axios.post(url, payload);
            commit("ADD_NEW_TREATMENT", newTreatment.data);
        } catch (err) {
            console.log(err);
        }
    },
    async addAppointment({ state, commit }, payload) {

        let url = "/appointments/";


        try {
            // console.log(Array.from(payload));
            const newAppointment = await this.$axios.post(url, payload);
            console.log('newAppolo: ', newAppointment.data)
            commit("ADD_NEW_APPOINTMENT", newAppointment.data);
            commit("ADD_NEW_ALL_APPOINTMENT", newAppointment.data);
        } catch (err) {
            console.log(err);
        }

    },
    async editAppointment({ state, commit }, payload) {
        let id = payload.id
            // console.log('undefined ID in payload: ', payload)
        let url = `/appointments/${id}/`;



        try {
            // console.log(Array.from(payload));
            console.log("Appointment editted");

            const newAppointment = await this.$axios.put(url, payload);

            // console.log('testing from add function', newAppointment.data)

            commit("EDIT_APPOINTMENT", newAppointment.data);
        } catch (err) {
            console.log(err);
        }

    },
    async uploadImage({ state, commit }, payload) {
        // console.log(payload)
        let id = payload.id;
        let frmData = payload.frmData;
        let url = payload.url;

        const imageResponse = await this.$axios.put(url, frmData);

        // console.log(imageResponse.data)

        commit('PUSH_IMAGE', imageResponse.data)
    },
    async onFilter({ state, commit }, payload) {

        let url = payload.url;
        let query = '';



        if (payload.date.dq === 'none') {

            query = `?input=${payload.searchInput}`;

        } else if (payload.date.dq === 'custom' && payload.date.date != '') {

            query = `?input=${payload.searchInput}&dq=${payload.date.dq}&date=${payload.date.date}`;

        } else if (payload.date.dq != '' || payload.date.dq != 'custom') {

            query = `?input=${payload.searchInput}&dq=${payload.date.dq}`

        } else {

            return

        }

        let filterUrl = `${url}${query}`

        // console.log(filterUrl)

        try {
            // console.log(Array.from(payload));
            const filterData = await this.$axios.get(filterUrl);
            commit(`GET_${payload.module}`, filterData.data);
        } catch (err) {
            console.log(err);
        }

    },
    async filterAppointments({ state, commit }, payload) {

        let url = "/appointments/";
        let query = '';

        if (payload.dq === 'none') {
            query = '';
        } else if (payload.dq === 'custom' && payload.date != '') {
            query = `?dq=${payload.dq}&date=${payload.date}`
        } else if (!payload.dq != '' || payload.dq != 'custom') {
            query = `?dq=${payload.dq}`
        } else {
            return
        }

        let filterUrl = `${url}${query}`

        try {
            // console.log(Array.from(payload));
            const allAppointments = await this.$axios.get(filterUrl);
            commit("GET_APPOINTMENTS", allAppointments.data);
        } catch (err) {
            console.log(err);
        }

    },
    showAlertStore({ state, commit }, counter) {
        if (counter >= 0) {
            commit('SHOW_ALERT_COUNTER', counter)
        }

    },
    triggerAlert({ state, commit }) {
        commit('TRIGGER_ALERT')
    },
    getPatientTreats({ state, commit }, id) {
        commit("GET_PATIENT_TREATMENTS", id);
    },
    toggleImageUploadOpen({ commit }) {
        commit('toggleImageUploadOpen');
    },
    setPimage({ commit }, image) {
        commit('SET_PIMAGE', image);
    },
    async loadAppointments({ state, commit }) {
        try {

            // const allAppointments = await store.dispatch('loadAppointments');
            let allAppointments = await this.$axios.get('/appointments/');

            commit("GET_APPOINTMENTS", allAppointments.data);

            // this.$store.dispatch('loadData', 'DONE');
        } catch (error) {
            console.log(error)
        }



    },
    makeToast({ state }, { variant = null, vm, module }) {

        if (variant === 'success') {
            vm.$bvToast.toast(`You successfully added a ${module}`, {
                title: `Add new ${module}`,
                variant: variant,
                autoHideDelay: 5000,
                solid: true
            })

        } else if (variant === 'danger') {
            vm.$bvToast.toast(`Unfortunately you failed adding a ${module}`, {
                title: `Add new ${module}`,
                variant: variant,
                autoHideDelay: 5000,
                solid: true
            })
        }

    },
};

const getters = {
    patients(state) {
        return state.patients;
    },
    patientsData(state) {
        return state.patients;
    },
    isAuthenticated(state) {
        return state.auth.loggedIn;
    },

    loggedInUser(state) {
        return state.auth.user;
    },
    getTreatments(state) {
        return state.treatments;
    },
    // GET PATIENT RELATED DATA
    getPatient(state) {
        return state.patient;
    },
    getPatientPDFs(state) {
        return state.patientPdfFiles;
    },
    getPatientImages(state) {
        return state.patientImageFiles;
    },
    getAppointments(state) {
        return state.appointments;
    },
    getAllAppointments(state) {
        return state.allAppointments;
    },
    hasPDF(state) {
        return state.hasPDF;
    },
    hasIMAGES(state) {
        return state.hasIMAGES;
    },
    progress(state) {
        return state.progress;
    },
    show(state) {
        return state.isImageUploadOpen;
    },
    patientHasImage(state) {
        return state.patientHasImage
    },
    pimage(state) {
        return state.pimage;
    },
    pid(state) {
        return state.pid;
    },
    counter(state) {
        return state.counter;
    },
    alertMsg(state) {
        return state.alertMsg;
    },
    alertStatus(state) {
        return state.alertStatus;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};