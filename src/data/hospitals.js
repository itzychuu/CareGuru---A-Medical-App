import doctor1 from "../assets/doctor1.jpeg";
import doctor2 from "../assets/doctor2.jpeg";
import doctor3 from "../assets/doctor3.jpeg";

const hospitals = [
  {
    id: 1,
    name: "City Care Hospital",
    address: "MG Road, Kochi",
    lat: 9.9312,
    lng: 76.2673,
    description: "Multi-specialty healthcare facility",
    doctors: [
      {
        name: "Dr. Anil Kumar",
        field: "General Medicine",
        image: doctor1,
      },
      {
        name: "Dr. Meera Joseph",
        field: "Cardiology",
        image: doctor2,
      },
      {
        name: "Dr. Ravi Menon",
        field: "Orthopedics",
        image: doctor3,
      },
    ]

    ,
  },
  {
    id: 2,
    name: "LifePlus Medical Center",
    address: "Pattom, Trivandrum",
    lat: 8.5241,
    lng: 76.9366,
    description: "Advanced diagnostic and treatment center",
    doctors: ["Dr. Ravi", "Dr. Suma"],
  },
  {
    id: 3,
    name: "Green Valley Hospital",
    address: "Technopark, Trivandrum",
    lat: 8.5581,
    lng: 76.8814,
    description: "24/7 emergency and pediatric care",
    doctors: ["Dr. John", "Dr. Priya"],
  },
];

export default hospitals;
