import test from "node:test";
import assert from "node:assert/strict";
import {salaryNet,loanPayment,futureValue} from "../lib/calculations/preview.ts";
test("salary manual deductions",()=>{assert.equal(salaryNet(8500000,500000),8000000);assert.throws(()=>salaryNet(100,-1));});
test("flat and annuity at zero rate",()=>{assert.equal(loanPayment(12000000,0,12,"flat"),1000000);assert.equal(loanPayment(12000000,0,12,"annuity"),1000000);});
test("flat versus annuity differs at positive rate",()=>{assert.ok(loanPayment(12000000,12,12,"flat")>loanPayment(12000000,12,12,"annuity"));});
test("savings no interest",()=>assert.equal(futureValue(1000000,100000,0,1),2200000));
test("positive returns increase projection",()=>assert.ok(futureValue(1000000,100000,6,5)>futureValue(1000000,100000,0,5)));
test("invalid terms rejected",()=>{assert.throws(()=>loanPayment(100,10,0,"flat"));assert.throws(()=>futureValue(0,0,5,0));});
