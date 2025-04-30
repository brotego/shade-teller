interface ShadeInfo {
  number: string;
  undertone: 'C' | 'W' | 'N';
  depth: 'LIGHT-MEDIUM' | 'MEDIUM-DEEP';
  proFiltr: boolean;
  eazeDrop: string | null;
  softLit: boolean;
}

export const fentyShades: ShadeInfo[] = [
  // Light-Medium Shades
  { number: '185', undertone: 'N', depth: 'LIGHT-MEDIUM', proFiltr: true, eazeDrop: '5', softLit: true },
  { number: '190', undertone: 'W', depth: 'LIGHT-MEDIUM', proFiltr: true, eazeDrop: '5', softLit: true },
  { number: '200', undertone: 'C', depth: 'LIGHT-MEDIUM', proFiltr: true, eazeDrop: '6', softLit: true },
  { number: '210', undertone: 'W', depth: 'LIGHT-MEDIUM', proFiltr: true, eazeDrop: '7', softLit: true },
  { number: '220', undertone: 'W', depth: 'LIGHT-MEDIUM', proFiltr: true, eazeDrop: '7', softLit: true },
  { number: '225', undertone: 'N', depth: 'LIGHT-MEDIUM', proFiltr: true, eazeDrop: '7', softLit: true },
  { number: '230', undertone: 'N', depth: 'LIGHT-MEDIUM', proFiltr: true, eazeDrop: '8', softLit: true },
  { number: '235', undertone: 'W', depth: 'LIGHT-MEDIUM', proFiltr: true, eazeDrop: '8', softLit: true },
  { number: '240', undertone: 'W', depth: 'LIGHT-MEDIUM', proFiltr: true, eazeDrop: '9', softLit: true },
  { number: '250', undertone: 'W', depth: 'LIGHT-MEDIUM', proFiltr: true, eazeDrop: '9', softLit: true },

  // Medium-Deep Shades
  { number: '345', undertone: 'W', depth: 'MEDIUM-DEEP', proFiltr: true, eazeDrop: '13', softLit: true },
  { number: '350', undertone: 'C', depth: 'MEDIUM-DEEP', proFiltr: true, eazeDrop: '15', softLit: true },
  { number: '360', undertone: 'N', depth: 'MEDIUM-DEEP', proFiltr: true, eazeDrop: '15', softLit: true },
  { number: '370', undertone: 'W', depth: 'MEDIUM-DEEP', proFiltr: true, eazeDrop: '16', softLit: true },
  { number: '385', undertone: 'N', depth: 'MEDIUM-DEEP', proFiltr: true, eazeDrop: '17', softLit: true },
  { number: '390', undertone: 'W', depth: 'MEDIUM-DEEP', proFiltr: true, eazeDrop: '18', softLit: true },
  { number: '400', undertone: 'W', depth: 'MEDIUM-DEEP', proFiltr: true, eazeDrop: '19', softLit: true },
  { number: '410', undertone: 'W', depth: 'MEDIUM-DEEP', proFiltr: true, eazeDrop: '19', softLit: true },
  { number: '420', undertone: 'W', depth: 'MEDIUM-DEEP', proFiltr: true, eazeDrop: '20', softLit: true },
  { number: '425', undertone: 'W', depth: 'MEDIUM-DEEP', proFiltr: true, eazeDrop: '20', softLit: true },
]; 