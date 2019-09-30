module.exports = {
    'Room form test' : function (rooms) {
        rooms
            .url('http://localhost:3000/rooms')
            .waitForElementVisible('body', 1000)
            .setValue('input[name=name]', 'Baltic room')
            .setValue('input[name=location]', 'Tallink')
            .setValue('input[name=maxSeats]', '200') //MAX 124
            .verify.value('input[name=name]', 'Baltic room')
            .verify.value('input[name=location]', 'Tallink')
            .verify.value('input[name=maxSeats]', '124')
            .verify.containsText( '.invalid-feedback', '')
            .click('button[type=submit]')
            .pause(2000)
            .assert.title('Conference Application')
    },
    'Conference form test': function(conferences) {
        conferences
            .url('http://localhost:3000/conferences')
            .waitForElementVisible('body', 1000)
            .click('select[id="roomSelectBox"] option[value="1"]')
            .setValue('input[name=name]', 'M/S Queen conference')
            .setValue('input[name=dateTime]', '12-10-2019T15:30')//ERROR 12.10.201915 03:00; IN DATABASE 2019-02-20 12:35:00; //INPUT TABLE 2019-02-20T12:35:00
            .verify.value('input[name=name]', 'M/S Queen conference')
            .verify.value('input[name=dateTime]', '2019-10-12T15:30')
            .verify.containsText( '.invalid-feedback', '')
            .click('button[type=submit]')
            .pause(2000)
            .assert.title('Conference Application')
    },
    'Participants form test': function(participants) {
        participants
            .url('http://localhost:3000/participants')
            .waitForElementVisible('body', 1000)
            .click('select[id="conferenceSelectBox"] option[value="9"]')
            .setValue('input[name=fullName]', 'Aleksandr Reit')
            .setValue('input[name=birthDate]', '21-02-2000')
            .verify.value('input[name=fullName]', 'Aleksandr Reit')
            .verify.value('input[name=birthDate]', '2000-02-21')
            .verify.containsText( '.invalid-feedback', '')
            .click('button[type=submit]')
            .pause(2000)
            .assert.title('Conference Application')
            .end();
    }
};