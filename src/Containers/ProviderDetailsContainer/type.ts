export interface Provider {
  about: string;
  address: string;
  image: string;
  location: string;
  phone_no: number;
  providerId: string;
  resturent_name: string;
}
export interface ProviderDetailsComponentProps {
  provider: Provider | undefined;
}
export interface ProviderHomeProps {
  provider: Provider | undefined;
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
