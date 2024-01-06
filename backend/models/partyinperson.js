const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  // CNR: {
  //   type: String,
  //   required: true,
  //   unique:true
  // },
  filecasetype: {
    type: String,
    enum: ['partyinperson', 'privateAdvocate', 'publicAdvocate'],
    default: 'partyinperson',
    required:true
  },
  plaintiffDetails: {
    fullName: String,
    gender: String,
    dateOfBirth: Date,
    caste: String,
    age: Number,
    relation: String,
    partyName: String,
    partyAddresses: String,
    partyPhoneNumbers: String,
    partyEmailAddresses: String,
    occupation: String,
    state: String,
    district: String,
    taluka: String,
    village: String,
  },
  defendantDetails: {
    fullName: String,
    gender: String,
    dateOfBirth: Date,
    caste: String,
    age: Number,
    relation: String,
    partyName: String,
    partyAddresses: String,
    partyPhoneNumbers: String,
    partyEmailAddresses: String,
    occupation: String,
    state: String,
    district: String,
    taluka: String,
    village: String,
  },
  caseDetails: {
    caseType: String,
    title: String,
    caseSummary: String,
    causeOfAction: String,
    reliefSought: String,
    dateOfCauseOfAction: Date,
    courtType: String,
    courtState: String,
    courtDistrict: String,
    courtName: String,
    caseCategory: String,
  },
  documents: [{
    document1: String, // Store URL or file path
    document2: String,
  }// Store URL or file path
    // Add more document fields as needed
  ],
  paymentDetails: {
    paymentMethod: String,
    cardNumber: String,
    expiryDate: String,
    cvv: String,
  },
});

const Case = mongoose.model('Filedcase', caseSchema);

module.exports = Case;
