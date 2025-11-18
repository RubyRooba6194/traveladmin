import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDestinations } from "../../hooks/useDestinations";
import { DestinationList } from "../../components/destinations/DestinationList";
import { SearchBar } from "../../components/common/SearchBar";
import { Loader } from "../../components/common/Loader";
import { destinationService } from "../../services/destination.service";
import { FiPlus, FiFilter } from "react-icons/fi";
import toast from "react-hot-toast";

export const Destinations = () => {
  const navigate = useNavigate();
  const { destinations, loading, refetch } = useDestinations();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRegion, setFilterRegion] = useState("all");

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion =
      filterRegion === "all" || dest.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this destination?"))
      return;

    try {
      await destinationService.delete(id);
      toast.success("Destination deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete destination");
      console.error(error);
    }
  };

  const handleEdit = (destination: any) => {
    navigate(`/destinations/edit/${destination.id}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Destinations</h1>
          <p className="text-gray-600 mt-1">Manage your travel destinations</p>
        </div>
        <button
          onClick={() => navigate("/destinations/new")}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
        >
          <FiPlus className="mr-2" />
          Add Destination
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search destinations..."
          />

          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-500" />
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Regions</option>
              <option value="Theni">Theni</option>
              <option value="Madurai">Madurai</option>
              <option value="Kerala">Kerala</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <DestinationList
        destinations={filteredDestinations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
