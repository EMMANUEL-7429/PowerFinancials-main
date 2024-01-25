export interface Systemuser {
 
    id: number,
    PwdMinAge:number;
    PwdMaxAge:number;
    PwdMinLength: number;
    PwdMaxLength: number,
    PwdComplex: boolean;
    PwdHistory: number;
    LoginAttempts: number;
    UseMultiFactor: boolean;
    OTPExpiry: boolean;
    CreatedOn: Date;
    CreatedBy: string;
    ModifiedOn: Date;
    ModifiedBy: string;
  }