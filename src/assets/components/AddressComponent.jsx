
const AddressCard = () => {
  const address = {
    street: "123 Church Street",
    city: "Warangal",
    state: "Telangana",
    postalCode: "506001",
    country: "India",
  };

  const rishik = {
    name: "Rishik",
    class: "B.Tech",
    religion: "Christian",
    love: "Only Jesus Christ",
    destination: "Heaven",
    money: "Rich - 500 million dollars",
    village: "Christian Warangal",
    hobby: "Going to Church",
    pray: "In the name of Jesus",
    heart: "Heart of Rishik",
    fan: "Kim Jong-un",
  };

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Saved Address</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-700"><strong>Street:</strong> {address.street}</p>
        <p className="text-gray-700"><strong>City:</strong> {address.city}</p>
        <p className="text-gray-700"><strong>State:</strong> {address.state}</p>
        <p className="text-gray-700"><strong>Postal Code:</strong> {address.postalCode}</p>
        <p className="text-gray-700"><strong>Country:</strong> {address.country}</p>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-4">Heart of Rishik</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-700"><strong>Name:</strong> {rishik.name}</p>
        <p className="text-gray-700"><strong>Class:</strong> {rishik.class}</p>
        <p className="text-gray-700"><strong>Religion:</strong> <b>{rishik.religion}</b></p>
        <p className="text-gray-700"><strong>Love:</strong> <b>{rishik.love}</b></p>
        <p className="text-gray-700"><strong>Destination:</strong> {rishik.destination}</p>
        <p className="text-gray-700"><strong>Money:</strong> {rishik.money}</p>
        <p className="text-gray-700"><strong>Village:</strong> {rishik.village}</p>
        <p className="text-gray-700"><strong>Hobby:</strong> {rishik.hobby}</p>
        <p className="text-gray-700"><strong>Pray:</strong> {rishik.pray}</p>
        <p className="text-gray-700"><strong>Heart:</strong> {rishik.heart}</p>
        <p className="text-gray-700"><strong>Fan of </strong> <b>{rishik.fan}</b> </p>
      </div>

      <img src="/WhatsApp Image 2025-03-06 at 02.23.44_90fc38f3.jpg" alt="Nature" className="rounded-lg mt-5 h-[500px]" />
      <img src="/download-krr.png" alt="Nature" className="rounded-lg mt-5 h-[200px]" />
      <img src="/rishik_love.jpg" alt="Nature" className="rounded-lg mt-5 h-[500px] w-[400px]" />
    </div>
  );
};

export default AddressCard;
