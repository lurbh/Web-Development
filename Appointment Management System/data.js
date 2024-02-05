const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "65c05af6dc74654018a06028";
const MASTER_KEY = "$2a$10$XaJJUyV/TynqhPQ33L/9XePy7.sjRxdhrX4DitNWpCW0Lj7OVY9JG"

// Function to create new appointment
function createAppointment(apptList, clinic, doctor, appttype, date, time) 
{
    const newAppointment = {
        // the purpose of the id is to give each Appointment an unique identity
        // use a random number for simplicty's sake
        "id": Math.floor(Math.random() * 10000),
        "clinic": clinic,
        "doctor": doctor,
        "appttype": appttype,
        "date": date,
        "time": time
    }
    // add the new Appointment to the array
    apptList.push(newAppointment);
}

// Funtion to find a specific appointment
function getAppointment(apptid,apptList)
{
    for (let a of apptList) 
        if (a.id == apptid) 
        {
            return a;
        }
    return null;
}

// Function of find and update a specific appointment
function updateAppointment(apptList, appt) 
{
    let wantedAppointment = null;
    for (let a of apptList) 
        if (a.id == appt.id) 
        {
            wantedAppointment = a;
            break;
        }
    wantedAppointment.clinic = appt.clinic;
    wantedAppointment.doctor = appt.doctor;
    wantedAppointment.appttype = appt.appttype;
    wantedAppointment.date = appt.date;
    wantedAppointment.time = appt.time;
}

// Function to cancel an appointment
function cancelAppointment(apptList, id) {
    // we need to find the index of the Appointment that we want in delete in the apptList array
    let wantedIndex = null;
    for (let i = 0; i < apptList.length; i++) {
        // check if the id of the Appointment that I want to delete
        // matches the id of the Appointment currently indicated by index `i`.
        if (id == apptList[i].id) {
            wantedIndex = i;
        }
    }
    if (wantedIndex != null) {
        // use .splice to delete an element from array
        apptList.splice(wantedIndex, 1);
    }
}

async function loadAppointments()
{
    const response = await axios.get(BASE_JSON_BIN_URL + "/" + BIN_ID + "/latest");
    //console.log(response.data.record);
    return response.data.record;
}

async function saveAppointments(apptList) {
    const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID}`, apptList, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY
      }
    });
    return response.data;
  
  }