export default function CardElement({ name, role, categories, imageUrl }) {


    return (
        <div className="w-[220px] rounded-lg overflow-hidden shadow-lg bg-white " style={{ minWidth: "250px" }}>
        <div className="bg-gray-300 h-[100px] flex items-center justify-center relative">
        <div className="w-[120px] h-[120px] relative">
            <img
            className="w-full h-full rounded-full object-contain bg-gray-700 border-4 border border-gray-800 bg-center absolute top-12"
            style={{ backgroundImage: `url('${imageUrl}')`, backgroundPosition: 'center' }}
            />
      </div>
        </div>
        <div className="px-6 py-4 text-center">
          <div className="font-bold text-xl uppercase mb-2 mt-16">{name}</div>
          <p className="text-gray-700 text-base mb-2">{role}</p>
         
            
        </div>
        <div className="pl-6 pr-6 pb-4 flex flex-col gap-2 text-center">
                
        {categories.map((category, index) => (
          <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            {category}
          </span>
        ))}
            
        </div>
      </div>
    );
}