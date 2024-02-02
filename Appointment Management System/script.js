// Main function when page is loaded
function main(filedata){
    let apptList = [];
    let datetime = new Date('March 13, 2024 14:20');
    let date = formatDate(datetime);
    let time = formatTime(datetime);
    createAppointment(apptList, "Harmony Health Center", "Dr. Olivia Bennett", "General Check-up", date, time);

    // Load data onto page from filedata
    loadDataFromFile(apptList,filedata);
    renderApptlist(apptList);

    // Add Event Listener for buttons
    const addAppointmentButton = document.querySelector("#addAppointmentbtn");
    addAppointmentButton.addEventListener("click", function(){
        toggleAddAppointment();
    });

    const submitAppointmentButton = document.querySelector("#submitAppointmentbtn");
    submitAppointmentButton.addEventListener("click", function(){
        submitAddAppointment(apptList);
        renderApptlist(apptList);
    });

    const editAppointmentButton = document.querySelector("#editAppointmentbtn");
    editAppointmentButton.addEventListener("click", function(){
        submiteditAppointment(apptList);
        renderApptlist(apptList);
    });

}

// Function to format date from a Date into a string
function formatDate(date) {
    var month = '' + (date.getMonth()),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

// Function to format time from a Date into a string
function formatTime(time) {
    let hr = '' + (time.getHours()),
        min = '' + time.getMinutes();

    if (hr.length < 2) 
        hr = '0' + hr;
    if (min.length < 2) 
        min = '0' + min;

    return [hr, min].join(':');
}

// Function to show the add appointment form to fill in
function toggleAddAppointment()
{
    const addApptbtn = document.querySelector("#addAppointmentbtn");
    const addAppt = document.querySelector("#addAppointment");
    const editApptbtn = document.querySelector("#editAppointmentbtn");
    const subApptbtn = document.querySelector("#submitAppointmentbtn");
    // Toggles View and set button usability
    editApptbtn.style.display = "None";
    subApptbtn.style.display = "block";
    addAppt.style.display = "block";
    addApptbtn.disabled = true;
    addAppt.scrollIntoView();
}

// Function to add appointment from data from form
function submitAddAppointment(apptList)
{
    const addApptbtn = document.querySelector("#addAppointmentbtn");
    const addAppt = document.querySelector("#addAppointment");
    const clinic = document.querySelector("#clinic");
    const doctor = document.querySelector("#doctor");
    const appttype = document.querySelector("#appttype");
    const date = document.querySelector("#date");
    const time = document.querySelector("#time");
    const top = document.querySelector("#bookappointment")
    // create appointment
    createAppointment(apptList,clinic.value,doctor.value,appttype.value,date.value,time.value);
    // reset form and return view to top and set button usability
    clinic.value = "";
    doctor.value = "";
    appttype.value = "";
    date.value = "";
    time.value = "";
    addAppt.style.display = "none";
    addApptbtn.disabled = false;
    top.scrollIntoView();
}

// Function to Chage color based on the appointment type
function getTypeColor(appttype) {
    if (appttype=="General Check-up") 
        return "#0d6efd";
    else if(appttype =="Urgent Care Appointment") 
        return "yellow";
    else if (appttype =="Follow-up Appointment") 
        return "lightblue"
    else if (appttype =="Chronic Disease Management") 
        return "red";
    else if (appttype =="Medication Review Appointment") 
        return "green";
    else if (appttype =="Preventive Care Appointment") 
        return "orange";
}

// Render the Appointment List in a table
function renderApptlist(apptList)
{
    const appttable = document.querySelector("#tablebody");
    appttable.innerHTML = "";
    for(let a of apptList)
    {
        const tablerow = document.createElement('tr');
        tablerow.innerHTML = `
        <th scope="row">${a.id}</th>
        <td>${a.clinic}</td>
        <td>${a.doctor}</td>
        <td style="color:${getTypeColor(a.appttype)};">${a.appttype}</td>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td><button class="btn btn-primary btn-sm edit-button">Edit</button></td>
        <td><button class="btn btn-danger btn-sm delete-button">Cancel</button></td>
        `;

        // select the edit button that is inside the apptList
        const editButton = tablerow.querySelector(".edit-button");
        editButton.addEventListener("click", function(){
            processEditAppointment(a, apptList);
        })

        // select the delete button that is inside the apptList
        tablerow.querySelector(".delete-button").addEventListener("click", function(){
            processCancelAppointment(a, apptList);
        })

        appttable.appendChild(tablerow);
    }
}

// Function to open edit an appointment form
function processEditAppointment(a,apptList)
{
    const editApptbtn = document.querySelector("#editAppointmentbtn")
    const addApptbtn = document.querySelector("#addAppointmentbtn");
    const subApptbtn = document.querySelector("#submitAppointmentbtn");
    const addAppt = document.querySelector("#addAppointment");
    const id = document.querySelector("#id");
    const clinic = document.querySelector("#clinic");
    const doctor = document.querySelector("#doctor");
    const appttype = document.querySelector("#appttype");
    const date = document.querySelector("#date");
    const time = document.querySelector("#time");
    // Get the details of appointment to edit and fill the form
    const appt = getAppointment(a.id,apptList);
    id.value = appt.id;
    clinic.value = appt.clinic;
    doctor.value = appt.doctor;
    appttype.value = appt.appttype;
    date.value = appt.date;
    time.value = appt.time;
    // Toggles View and set button usability
    editApptbtn.style.display = "block";
    subApptbtn.style.display = "None";
    addAppt.style.display = "block";
    addApptbtn.disabled = true;
    addAppt.scrollIntoView();
}

// Function to submit updated appointment info
function submiteditAppointment(apptList)
{
    const editApptbtn = document.querySelector("#editAppointmentbtn")
    const addApptbtn = document.querySelector("#addAppointmentbtn");
    const subApptbtn = document.querySelector("#submitAppointmentbtn");
    const addAppt = document.querySelector("#addAppointment");
    const id = document.querySelector("#id");
    const clinic = document.querySelector("#clinic");
    const doctor = document.querySelector("#doctor");
    const appttype = document.querySelector("#appttype");
    const date = document.querySelector("#date");
    const time = document.querySelector("#time");
    const top = document.querySelector("#bookappointment")
    // get updated info and prep to update
    const updatedAppt = {
        "id": id.value,
        "clinic": clinic.value,
        "doctor": doctor.value,
        "appttype": appttype.value,
        "date": date.value,
        "time": time.value
    }
    updateAppointment(apptList,updatedAppt);
    // reset form when update is done
    clinic.value = "";
    doctor.value = "";
    appttype.value = "";
    date.value = "";
    time.value = "";
    // Toggles View and set button usability
    editApptbtn.style.display = "None";
    subApptbtn.style.display = "block";
    addAppt.style.display = "None";
    addApptbtn.disabled = false;
    renderApptlist(apptList);
    top.scrollIntoView();
}

// Function to cancel appointment
function processCancelAppointment(appt,apptList)
{
    // prompt user to confirm appointment cancellation 
    const confirmDelete = confirm(`Are you sure you want to cancel appointment at ${appt.clinic} with ${appt.doctor} on ${appt.date}, ${appt.time}?`);
    if (confirmDelete) {
        cancelAppointment(apptList, appt.id);
    }
    renderApptlist(apptList);
}

// Function to load data from file provided 
function loadDataFromFile(apptList,filedata)
{
    for(let data of filedata.Appointments)
        createAppointment(apptList, data.clinic, data.doctor, data.appttype, data.date, data.time);
}

document.addEventListener("DOMContentLoaded", async function() {
    // Get data from JSON file
    const response = await axios.get("data.json");
    //console.log(response);
    // Pass data into main function
    main(response.data);
});