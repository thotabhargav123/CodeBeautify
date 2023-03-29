const monStartWeekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
]
function populate() {
    for (let i = 0; i < monStartWeekDays.length; i++) {
        $("tbody").append(
            `<tr class="">
<td class="ps-3 text-start">${monStartWeekDays[i]}</td>
<td>
    <input id="shour${monStartWeekDays[i]}" placeholder="00">: <input id="sminute${monStartWeekDays[i]}" placeholder="00">
    <select name="type" id="ssel${monStartWeekDays[i]}">
        <option>AM</option>
        <option>PM</option>
    </select>
</td>
<td>
    <input id="ehour${monStartWeekDays[i]}" placeholder="00">: <input id="eminute${monStartWeekDays[i]}" placeholder="00">
    <select name="type" id=esel${monStartWeekDays[i]}>
        <option>AM</option>
        <option>PM</option>
    </select>
</td>
<td>
    <input id="bhour${monStartWeekDays[i]}" placeholder="00">: <input id="bminute${monStartWeekDays[i]}" placeholder="00">
</td>
<td class="hours-worked" hidden-total\""="" id="totalHrs${monStartWeekDays[i]}">0:00</td>
</tr>
`
        )
        function calculateHours() {
            let shour = (document.getElementById(`shour${monStartWeekDays[i]}`).value);
            let sminute = (document.getElementById(`sminute${monStartWeekDays[i]}`).value);

            let ehour = (document.getElementById(`ehour${monStartWeekDays[i]}`).value);
            let eminute = (document.getElementById(`eminute${monStartWeekDays[i]}`).value);

            let bhour = (document.getElementById(`bhour${monStartWeekDays[i]}`).value);
            let bminute = (document.getElementById(`bminute${monStartWeekDays[i]}`).value);

            if (sminute === "") {
                sminute = '0';
            }

            if (eminute === '') {
                eminute = '0';
            }
            if (bminute === "") {
                bminute = '0';
            }
            if (bhour === "") {
                bhour = '0';
            }
            if (shour === "") {
                shour = '0';
            }
            if (ehour === "") {
                ehour = '0';
            }
            let ssel = document.getElementById(`ssel${monStartWeekDays[i]}`).value
            let esel = document.getElementById(`esel${monStartWeekDays[i]}`).value

            // console.log(ssel, esel)

            let starttime = shour + ":" + sminute
            let endtime = ehour + ":" + eminute

            starttime = convertTo24HourFormat(starttime, ssel);
            endtime = convertTo24HourFormat(endtime, esel);
            breaktime = parseInt(bhour) * 60 + parseInt(bminute);
            // console.log(starttime, endtime);

            let diff = endtime - starttime;
            diff = diff - breaktime

            // Convert difference back to hours and minutes
            let hours = Math.floor(diff / 60);
            if (hours < 0) {
                hours = hours + 24;
            }
            if (hours < 10) {
                hours = '0' + hours;
            }
            let minutes = diff % 60;
            if (minutes < 0) {
                minutes = minutes + 60;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (shour !== '' && ehour !== '') {
                $(`#totalHrs${monStartWeekDays[i]}`).html(hours + ":" + minutes);
            }
        }
        function convertTo24HourFormat(time, amPm) {
            var hours = parseInt(time.split(":")[0]);
            var minutes = parseInt(time.split(":")[1]);
            // console.log("HH")
            if (amPm === "PM" && hours !== 12) {
                hours += 12;
                // console.log("hours is " + hours)
            } else if (amPm === "AM" && hours === 12) {
                hours = 0;
            }

            return hours * 60 + minutes;
        }
        $(
            `#shour${monStartWeekDays[i]}, #sminute${monStartWeekDays[i]}, #ehour${monStartWeekDays[i]}, #eminute${monStartWeekDays[i]}, #bhour${monStartWeekDays[i]},#bminute${monStartWeekDays[i]},#ssel${monStartWeekDays[i]},#esel${monStartWeekDays[i]}`
        ).on("change", calculateHours)

    }
}
$("#summer").on("click", function (e) {

    let totalhours = 0;
    let totalminutes = 0;
    let totals = document.getElementsByClassName("hours-worked")
    for (let i = 0; i < totals.length; i++) {
        totalhours = totalhours + parseInt(totals[i].innerHTML.split(":")[0]);
        totalminutes = totalminutes + parseInt(totals[i].innerHTML.split(":")[1]);
    }
    totalminutes = totalhours * 60 + totalminutes;
    totalhours = Math.floor(totalminutes / 60);
    totalminutes = totalminutes % 60;

    document.getElementById("totalHours").innerHTML = "Total hours: " + totalhours + ":" + totalminutes
})
$("#clearALL").on("click", function (e) {
    // console.log("hii")
    let totals = document.getElementsByClassName("hours-worked")
    for (let i = 0; i < totals.length; i++) {
        totals[i].innerHTML = "0:00"
    }
    let inpu = document.getElementsByTagName("input");
    for (let i = 0; i < inpu.length; i++) {
        inpu[i].value = "";
    }
})
window.addEventListener("load", function () {
    populate()
})


