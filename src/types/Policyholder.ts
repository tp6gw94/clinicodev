export interface Policyholder {
  code: string;
  name: string;
  registration_date: Date;
  introducer_code: string;
}

export interface RootPolicyholder extends Policyholder {
  l: Policyholder[];
  r: Policyholder[];
}
