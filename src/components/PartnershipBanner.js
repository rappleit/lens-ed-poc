const PartnershipBanner = ({ partner }) => {
  return (
    <a href={partner.url} target="_blank" rel="noopener noreferrer">
      <div className="w-full py-2 px-4 border border-gray-300 bg-blue-50  border-1 mb-4 rounded-lg flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-base">In Partnership With</h2>
          <h1 className="text-xl font-semibold">{partner.name}</h1>
        </div>
        <img src={partner.logoUrl} alt={partner.name} className="w-[20%]" />
      </div>
    </a>
  );
};

export default PartnershipBanner;
