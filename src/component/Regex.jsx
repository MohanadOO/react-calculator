const numberOfOperatorTest = new RegExp (/([+/*=]\s+[+/*=])(\s+[+/*=])*|([-]\s+[+*/=])(\s+[+/*=])*|([+=/*]\s+[-]\s+[-+/*])/, 'g');

export default numberOfOperatorTest
