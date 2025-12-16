
export type ApprovalStatus = "Waiting" | "Accepted" | "Rejected";
export type ApprovalStatusDetail = "Waiting For Supervisor" | "Waiting for Admin";

export interface ApprovalData {
  plate: string;
  model: string;
  date: string;
  driver: string;
  driverContact: string;
  supervisor: string;
  supervisorContact: string;
  office: string;
  status: ApprovalStatus;
  statusDetails?: ApprovalStatusDetail
}

export const approvalData = [
  {
    plate: "B 1234 ABC",
    model: "Toyota Innova",
    date: "22/12/2025",
    driver: "John Doe",
    driverContact: "08123444444",
    supervisor: "Ilham",
    supervisorContact: "08123131321",
    office: "Cikarang",
    status: "Waiting",
    statusDetails: "Waiting For Admin"
  },
  {
    plate: "B 5678 DEF",
    model: "Toyota Hilux",
    date: "23/12/2025",
    driver: "Andi Pratama",
    driverContact: "08129876543",
    supervisor: "Rizky",
    supervisorContact: "08123456789",
    office: "Head Office",
    status: "Accepted",
    statusDetails: "Waiting For Supervisor"
  },
  {
    plate: "D 4321 GHI",
    model: "Isuzu Panther",
    date: "24/12/2025",
    driver: "Budi Santoso",
    driverContact: "08211234567",
    supervisor: "Ilham",
    supervisorContact: "08123131321",
    office: "Cikarang",
    status: "Rejected",
    statusDetails: ""
  },
  {
    plate: "F 8765 JKL",
    model: "Mitsubishi Triton",
    date: "25/12/2025",
    driver: "Rian Kurnia",
    driverContact: "081355566677",
    supervisor: "Dimas",
    supervisorContact: "08129887766",
    office: "Site A",
    status: "Waiting",
    statusDetails: "Waiting For Supervisor"

  },
  {
    plate: "B 9988 MNO",
    model: "Toyota Fortuner",
    date: "26/12/2025",
    driver: "Ahmad Fauzi",
    driverContact: "081233344455",
    supervisor: "Rizky",
    supervisorContact: "08123456789",
    office: "Site B",
    status: "Accepted",
    statusDetails: ""
  },
  {
    plate: "B 2233 PQR",
    model: "Suzuki APV",
    date: "27/12/2025",
    driver: "Dewi Lestari",
    driverContact: "082134556677",
    supervisor: "Ilham",
    supervisorContact: "08123131321",
    office: "Head Office",
    status: "Waiting",
    statusDetails: "Waiting for Admin"
  },
  {
    plate: "E 3344 STU",
    model: "Toyota Hiace",
    date: "28/12/2025",
    driver: "Fajar Nugroho",
    driverContact: "081299988877",
    supervisor: "Dimas",
    supervisorContact: "08129887766",
    office: "Site C",
    status: "Accepted",
  },
  {
    plate: "B 4455 VWX",
    model: "Daihatsu Gran Max",
    date: "29/12/2025",
    driver: "Rizal Maulana",
    driverContact: "081377788899",
    supervisor: "Rizky",
    supervisorContact: "08123456789",
    office: "Cikarang",
    status: "Rejected",
  },
  {
    plate: "D 5566 YZA",
    model: "Toyota Avanza",
    date: "30/12/2025",
    driver: "Siti Rahma",
    driverContact: "082145678901",
    supervisor: "Ilham",
    supervisorContact: "08123131321",
    office: "Head Office",
    status: "Waiting",
    statusDetails: "Waiting for Admin"
  },
  {
    plate: "B 6677 BCD",
    model: "Isuzu ELF",
    date: "31/12/2025",
    driver: "Hendra Wijaya",
    driverContact: "081388899900",
    supervisor: "Dimas",
    supervisorContact: "08129887766",
    office: "Site A",
    status: "Accepted",
  },
  {
    plate: "B 7788 EFG",
    model: "Toyota Hilux",
    date: "01/01/2026",
    driver: "Yusuf Hakim",
    driverContact: "081255566677",
    supervisor: "Rizky",
    supervisorContact: "08123456789",
    office: "Site B",
    status: "Waiting",
    statusDetails: "Waiting for Supervisor"
  },
  {
    plate: "F 8899 HIJ",
    model: "Mitsubishi L300",
    date: "02/01/2026",
    driver: "Agus Salim",
    driverContact: "082199988877",
    supervisor: "Ilham",
    supervisorContact: "08123131321",
    office: "Cikarang",
    status: "Rejected",
  },
  {
    plate: "B 9900 KLM",
    model: "Toyota Innova Zenix",
    date: "03/01/2026",
    driver: "Putra Adi",
    driverContact: "081233366699",
    supervisor: "Dimas",
    supervisorContact: "08129887766",
    office: "Head Office",
    status: "Accepted",
  },
  {
    plate: "D 1122 NOP",
    model: "Suzuki Ertiga",
    date: "04/01/2026",
    driver: "Rina Amalia",
    driverContact: "081277788899",
    supervisor: "Rizky",
    supervisorContact: "08123456789",
    office: "Site C",
    status: "Waiting",
    statusDetails: "Waiting for Admin"
  },
  {
    plate: "B 3344 QRS",
    model: "Toyota Fortuner",
    date: "05/01/2026",
    driver: "Arif Setiawan",
    driverContact: "081366677788",
    supervisor: "Ilham",
    supervisorContact: "08123131321",
    office: "Site A",
    status: "Accepted",
  },
  {
    plate: "E 4455 TUV",
    model: "Daihatsu Luxio",
    date: "06/01/2026",
    driver: "Wahyu Prakoso",
    driverContact: "082166677788",
    supervisor: "Dimas",
    supervisorContact: "08129887766",
    office: "Cikarang",
    status: "Rejected",
  },
  {
    plate: "B 5566 WXY",
    model: "Toyota Avanza",
    date: "07/01/2026",
    driver: "Nanda Putri",
    driverContact: "081299900011",
    supervisor: "Rizky",
    supervisorContact: "08123456789",
    office: "Head Office",
    status: "Waiting",
    statusDetails: "Waiting for Admin"
  },
  {
    plate: "D 6677 ZAB",
    model: "Isuzu Panther",
    date: "08/01/2026",
    driver: "Bayu Saputra",
    driverContact: "081233344499",
    supervisor: "Ilham",
    supervisorContact: "08123131321",
    office: "Site B",
    status: "Accepted",
  },
  {
    plate: "B 7788 CDE",
    model: "Mitsubishi Triton",
    date: "09/01/2026",
    driver: "Robby Firmansyah",
    driverContact: "082122233344",
    supervisor: "Dimas",
    supervisorContact: "08129887766",
    office: "Site C",
    status: "Waiting",
    statusDetails: "Waiting for Supervisor"
  },
  {
    plate: "F 8899 FGH",
    model: "Toyota Hiace",
    date: "10/01/2026",
    driver: "Indra Kurniawan",
    driverContact: "081377799900",
    supervisor: "Rizky",
    supervisorContact: "08123456789",
    office: "Cikarang",
    status: "Accepted",
  },
];
