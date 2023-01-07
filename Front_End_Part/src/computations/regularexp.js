const businesscode=(val)=>{
  
  const exp={
    containsAlphabet : /[A-Za-z0-9]/
  }
  // eslint-disable-next-line
  let expMatch={};
  expMatch.containsAlphabet=exp.containsAlphabet.test(val);
  return expMatch.containsAlphabet

}

const busniessyear=(val)=>{
  const exp={
    containsAlphabet : /^([0-9]){4}$/
  }
  // eslint-disable-next-line
  let expMatch={};
  expMatch.containsAlphabet=exp.containsAlphabet.test(val);
  return expMatch.containsAlphabet
}

const custnumber=(val)=>{
  const exp={
    numbers:/^([0-9]){9,10}$/
  }
  // eslint-disable-next-line
  let expMatch={};
  expMatch.numbers=exp.numbers.test(val);
  return expMatch.numbers;
}

const documentid=(val)=>{
  const exp={
    numbers:/^([0-9]){10}$/
  }
  // eslint-disable-next-line
  let expMatch={};
  expMatch.numbers=exp.numbers.test(val);
  return expMatch.numbers;
}

const invoicecurrency=(val)=>{
  const exp={
    numbers:/^(usd|USD|cad|CAD)$/
  }
  // eslint-disable-next-line
  let expMatch={};
  expMatch.numbers=exp.numbers.test(val);
  return expMatch.numbers;
}

const documenttype=(val)=>{
  const exp={
    containsAlphabet : /^([A-Za-z]){1,2}([0-9]){0,1}$/
  }
  // eslint-disable-next-line
  let expMatch={};
  expMatch.containsAlphabet=exp.containsAlphabet.test(val);
  return expMatch.containsAlphabet
}

const postingid=(val)=>{
  const exp={
    containsAlphabet : /^([0-1]){1}$/
  }
  // eslint-disable-next-line
  let expMatch={};
  expMatch.containsAlphabet=exp.containsAlphabet.test(val);
  return expMatch.containsAlphabet
}

const custpaymentterms=(val)=>{
  const exp={
    containsAlphabet : /^([a-zA-Z0-9]{4})$/
  }
  // eslint-disable-next-line
  let expMatch={};
  expMatch.containsAlphabet=exp.containsAlphabet.test(val);
  return expMatch.containsAlphabet
}

const movieType=(val)=>{
  let check=false;
    if(val==="Action")check=true;
    else if(val==="action")check=true;
    else if(val==="Adventure")check=true;
    else if(val==="adventure")check=true;
    else if(val==="Comedy")check=true;
    else if(val==="comedy")check=true;
    else if(val==="Drama")check=true;
    else if(val==="drama")check=true;
    else if(val==="Horror")check=true;
    else if(val==="horror")check=true;
    else if(val==="Romance")check=true;
    else if(val==="romance")check=true;
    else if(val==="Fiction")check=true;
    else if(val==="fiction")check=true;
    else if(val==="Science")check=true;
    else if(val==="science")check=true;
    else if(val==="Science fiction")check=true;
    else if(val==="science fiction")check=true;
    else if(val==="Fantasy")check=true;
    else if(val==="fantasy")check=true;
    else if(val==="Historical")check=true;
    else if(val==="historical")check=true;
    else if(val==="Crime")check=true;
    else if(val==="crime")check=true;
  return check;
}

const checkdate=(val)=>{
  const exp={
    numbers:/^\s*$/g
  }
  // eslint-disable-next-line
  let expMatch={};
  expMatch.numbers=exp.numbers.test(val);
  return !expMatch.numbers;
}

export {businesscode,busniessyear,custnumber,documentid,invoicecurrency,documenttype,postingid,custpaymentterms,movieType,checkdate};