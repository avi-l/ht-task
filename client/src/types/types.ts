export interface IHouseRecord {
  id?: number;
  address?: string;
  currentValue?: number;
  loanAmount?: number;
  risk?: number;
  updatedAt?: string;
  image: string;
}

export interface HouseCardProps {
  house: IHouseRecord;
}

export interface HouseListProps {
  houses: IHouseRecord[];
}
