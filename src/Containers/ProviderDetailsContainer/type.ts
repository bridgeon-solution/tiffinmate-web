export interface ProviderDetails {
  about: string;
  address: string;
  image: string;
  location: string;
  phone_no: number;
  providerId: string;
  resturent_name: string;
}
export interface ProviderDetailsComponentProps {
  provider: ProviderDetails | undefined;
}
export interface ProviderHomeProps {
  provider: ProviderDetails | undefined;
}


export interface Review {
  id: string;
  image: string;
  providerId: string;
  providerName: string;
  review: string;
  userId: string;
  username: string;
}

export interface provider {
  provider_id: string;
  image: string;
  resturent_name: string;
}
export interface providerDetailsProp{
  providers:provider[]
}