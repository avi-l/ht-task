export interface IHouseRecord {
    id?: number;
    address?: string;
    currentValue?: number;
    loanAmount?: number;
    risk?: number;
  }

export interface HouseCardProps {
    house: IHouseRecord;
  }
  
export interface HouseListProps {
  houses: IHouseRecord[];
}

  