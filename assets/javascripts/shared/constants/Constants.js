export const GENDER_MALE = "1";
export const GENDER_FEMALE = "2";

export const GENDER_MASTER = [
  {
    label: "Male",
    value: GENDER_MALE
  },
  {
    label: "Female",
    value: GENDER_FEMALE
  }
];

export const GENDER_MAP_FOR_LABEL = {
  "1": "Male",
  "2": "Female"
};

export const YES_OR_NO_MAP_FOR_LABEL = {
  "1": "Yes",
  "2": "No"
};

export const COLLATERAL_TYPE_MAP_FOR_LABEL = {
  "1": "String",
  "2": "Number",
  "3": "Date"
};

export const WORKING_FOR_COMPANY_YES = "1";
export const WORKING_FOR_COMPANY_NO = "2";

export const YES = "1";
export const NO = "2";

export const WORKING_FOR_COMPANY_MASTER = [
  {
    label: "Yes",
    value: WORKING_FOR_COMPANY_YES
  },
  {
    label: "No",
    value: WORKING_FOR_COMPANY_NO
  }
];


export const WORKING_YEARS = [for (i of Array(61).keys()) i.toString()];
export const WORKING_MONTHS = [for (i of Array(12).keys()) i.toString()];

export const OWNER_BORROWER = "1"
export const OWNER_OTHERS = "2"


export const OWNER_MASTER = [
  {
    label: "Borrower",
    value: OWNER_BORROWER
  },
  {
    label: "Others",
    value: OWNER_OTHERS
  }
];

export const OWNER_MAP_FOR_LABEL = {
  "1": "Borrower",
  "2": "Others"
}

export const CURRENCY_USD = "1";
export const CURRENCY_LKR = "2";
export const CURRENCY_MMK = "3";
export const CURRENCY_KHR = "4";


export const CURRENCY_MASTER = [
  {
    label: "USD",
    value: CURRENCY_USD
  },
  {
    label: "LKR",
    value: CURRENCY_LKR
  },
  {
    label: "MMK",
    value: CURRENCY_MMK
  },
  {
    label: "KHR",
    value: CURRENCY_KHR
  }

];

export const CURRENCY_MAP_FOR_LABEL = {
  "1" : "USD",
  "2" : "LKR",
  "3" : "MMK",
  "4" : "KHR"
};



export const LOAN_PURPOSE_BUSINESS = "1";
export const LOAN_PURPOSE_CONSUMPTION = "2";
export const LOAN_PURPOSE_MIX = "3";

export const LOAN_PURPOSE_MASTER = [
  {
    label: "Business",
    value: LOAN_PURPOSE_BUSINESS
  },
  {
    label: "Consumption",
    value: LOAN_PURPOSE_CONSUMPTION
  },
  {
    label: "Mix",
    value: LOAN_PURPOSE_MIX
  }
];

export const LOAN_PURPOSE_MAP_FOR_LABEL = {
  "1": "Business",
  "2": "Consumption",
  "3": "Mix"
};






export const FAMILY_TYPE_SPOUSE = "1";
export const FAMILY_TYPE_FATHER = "2";
export const FAMILY_TYPE_MOTHER = "3";
export const FAMILY_TYPE_SON = "4";
export const FAMILY_TYPE_DAUGHTER = "5";
export const FAMILY_TYPE_BROTHER = "6";
export const FAMILY_TYPE_SISTER = "7";


export const FAMILY_TYPE_MASTER = [
  {
    label: "Spouse",
    value: FAMILY_TYPE_SPOUSE
  },
  {
    label: "Father",
    value: FAMILY_TYPE_FATHER
  },
  {
    label: "Mother",
    value: FAMILY_TYPE_MOTHER
  },
  {
    label: "Son",
    value: FAMILY_TYPE_SON
  },
  {
    label: "Daughter",
    value: FAMILY_TYPE_DAUGHTER
  },
  {
    label: "Brother",
    value: FAMILY_TYPE_BROTHER
  },
  {
    label: "Sister",
    value: FAMILY_TYPE_SISTER
  },

];

export const FAMILY_TYPE_MAP_FOR_LABEL = {
  "1" : "Spouse",
  "2" : "Father",
  "3" : "Mother",
  "4" : "Son",
  "5" : "Daughter",
  "6" : "Brother",
  "7" : "Sister"
};



export const DEPENDENT_YES = "1";
export const DEPENDENT_NO = "2";


export const DEPENDENT_MASTER = [
  {
    label: "Yes",
    value: DEPENDENT_YES
  },
  {
    label: "No",
    value: DEPENDENT_NO
  }
];

export const DEPENDENT_MAP_FOR_LABEL = {
  "1" : "Yes",
  "2" : "No"
};

export const STATUS_CUSTOMER = "1"
export const STATUS_POTENTIAL_CUSTOMER = "2"








export const WEEKENDS_IN_INSTALLMENT_DAYS_NEXT_BUSINESS_DAY = "1";
export const WEEKENDS_IN_INSTALLMENT_DAYS_PREVIOUS_BUSINESS_DAY = "2";
export const WEEKENDS_IN_INSTALLMENT_DAYS_NO = "3";

export const WEEKENDS_IN_INSTALLMENT_DAYS_MASTER = [
  {
    label: "Next business day",
    value: WEEKENDS_IN_INSTALLMENT_DAYS_NEXT_BUSINESS_DAY
  },
  {
    label: "Previous business day",
    value: WEEKENDS_IN_INSTALLMENT_DAYS_PREVIOUS_BUSINESS_DAY
  },
  {
    label: "No",
    value: WEEKENDS_IN_INSTALLMENT_DAYS_NO
  },
];

export const WEEKENDS_IN_INSTALLMENT_DAYS_MAP_FOR_LABEL = {
  "1" : "Next business day",
  "2" : "Previous business day",
  "3" : "No",
};





export const COLLECTION_STATUS_COLLECTED = 1
export const COLLECTION_STATUS_UNCOLLECTED = 2
