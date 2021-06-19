module.exports = {
  //---------------ROOMS TESTS---------------
  "Room form input all data": function (roomsInput) {
    roomsInput
      .url("http://localhost:3000/rooms")
      .waitForElementVisible("body", 1000)
      .setValue("input[name=name]", "Baltic room")
      .setValue("input[name=location]", "Tallink")
      .setValue("input[name=maxSeats]", "200") //MAX 124
      .verify.value("input[name=name]", "Baltic room")
      .verify.value("input[name=location]", "Tallink")
      .verify.value("input[name=maxSeats]", "124")
      .verify.containsText("#invalid-name", "")
      .verify.containsText("#invalid-location", "")
      .verify.containsText("#invalid-maxSeats", "")
      .click("button[type=submit]")
      .pause(2000)
      .assert.title("Conference Application");
  },
  "Room form check errors visible": function (roomsErrors) {
    roomsErrors
      .url("http://localhost:3000/rooms")
      .waitForElementVisible("body", 1000)
      .setValue("input[name=name]", "         ")
      .setValue("input[name=location]", "         ")
      .setValue("input[name=maxSeats]", "         ") //MAX 124
      .verify.value("input[name=name]", "         ")
      .verify.value("input[name=location]", "         ")
      .verify.value("input[name=maxSeats]", "")
      .click("input[name=name]") //To trigger maxSeats error
      .verify.containsText(
        "#invalid-name",
        "Room name must be longer than 3 characters"
      )
      .verify.containsText(
        "#invalid-location",
        "Location must be longer than 3 characters"
      )
      .verify.containsText("#invalid-maxSeats", "Maximum seats cant be empty")
      .verify.value("button[disabled]", "")
      .pause(2000)
      .assert.title("Conference Application");
  },
  //---------------ROOMS TESTS---------------
  //---------------CONFERENCES TESTS---------------
  "Conference form input all data": function (conferencesInput) {
    conferencesInput
      .url("http://localhost:3000/conferences")
      .waitForElementVisible("body", 1000)
      .click('select[id="roomSelectBox"] option[value="1"]')
      .setValue("input[name=name]", "M/S Queen conference")
      .setValue("input[name=dateTime]", "12-10-2019T15:30") //ERROR 12.10.201915 03:00; IN DATABASE 2019-02-20 12:35:00; //INPUT TABLE 2019-02-20T12:35:00
      .verify.value("input[name=name]", "M/S Queen conference")
      .verify.value("input[name=dateTime]", "2019-10-12T15:30")
      .verify.containsText("#invalid-roomId", "")
      .verify.containsText("#invalid-name", "")
      .verify.containsText("#invalid-dateTime", "")
      .click("button[type=submit]")
      .pause(2000)
      .assert.title("Conference Application");
  },
  "Conference form check errors visible": function (conferencesErrors) {
    conferencesErrors
      .url("http://localhost:3000/conferences")
      .waitForElementVisible("body", 1000)
      // .click('select[id="roomSelectBox"] option[value="1"]')
      // .setValue('select[id=roomSelectBox]', '')
      .setValue("input[name=name]", "         ")
      .setValue("input[name=dateTime]", "         ")
      .verify.value("input[name=name]", "         ")
      .verify.value("input[name=dateTime]", "")
      .click("input[name=name]") //To trigger dateTime error
      .verify.containsText("#invalid-roomId", "")
      .verify.containsText(
        "#invalid-name",
        "Conference name must be longer than 3 characters"
      )
      .verify.containsText("#invalid-dateTime", "Date and time must be entered")
      .verify.value("button[disabled]", "")
      .pause(2000)
      .assert.title("Conference Application");
  },
  //---------------CONFERENCES TESTS---------------
  //---------------PARTICIPANTS TESTS---------------
  "Participants form input all data": function (participantsInput) {
    participantsInput
      .url("http://localhost:3000/participants")
      .waitForElementVisible("body", 1000)
      .click('select[id="conferenceSelectBox"] option[value="2"]')
      .setValue("input[name=fullName]", "Aleksandr Reit")
      .setValue("input[name=birthDate]", "21-02-2000")
      .verify.value("input[name=fullName]", "Aleksandr Reit")
      .verify.value("input[name=birthDate]", "2000-02-21")
      .verify.containsText(".invalid-feedback", "")
      .click("button[type=submit]")
      .pause(2000)
      .assert.title("Conference Application");
  },
  "Participants form check errors visible": function (participantsErrors) {
    participantsErrors
      .url("http://localhost:3000/participants")
      .waitForElementVisible("body", 1000)
      // .click('select[id="conferenceSelectBox"] option[value="2"]')
      // .setValue('select[id=roomSelectBox]', '')
      .setValue("input[name=fullName]", "         ")
      .setValue("input[name=birthDate]", "         ")
      .verify.value("input[name=fullName]", "         ")
      .verify.value("input[name=birthDate]", "")
      .click("input[name=fullName]") //To trigger birthDate error
      .verify.containsText("#invalid-conferenceId", "")
      .verify.containsText(
        "#invalid-fullName",
        "Full name must be longer than 3 characters"
      )
      .verify.containsText("#invalid-birthDate", "Birth date must be entered")
      .verify.value("button[disabled]", "")
      .pause(2000)
      .assert.title("Conference Application")
      .end();
  },
  //---------------PARTICIPANTS TESTS---------------
};
