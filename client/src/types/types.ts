export interface IHouseRecord {
  id?: number;
  address?: string;
  currentValue?: number;
  loanAmount?: number;
  risk?: number;
  updatedAt?: string;
  image?: string;
}

export interface HouseCardProps {
  house: IHouseRecord;
}

export interface HouseListProps {
  houses: IHouseRecord[];
}

export interface HousesState {
  houses: IHouseRecord[];
}

export interface ModalState {
  isOpen: boolean;
}

export interface IHouseRisk {
  currentValue: number;
  loanAmount: number;
}
