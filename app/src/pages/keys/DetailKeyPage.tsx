import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {
  HiChevronLeft,
  HiOutlineDuplicate,
  HiOutlineShieldCheck,
  HiOutlineTrash,
} from "react-icons/hi";
import {useNavigate, useParams} from "react-router-dom";
import MainTitle from "../../component/MainTitle";
import NavBar from "../../component/NavBar";
import SubTitle from "../../component/SubTitle";
import type {Key} from "../../interfaces/key";
import HistoricService from "../../services/HistoricService";
import KeysService from "../../services/KeysService";
import Modal from "../../component/Modal";

function DetailKeyPage() {
  const {id} = useParams();
  const navigate = useNavigate();
  // Objetos
  const [key, setKey] = useState<Key>();
  // Utilitários
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchKey = async () => {
      //  Garantia de integridade
      if (!id) {
        navigate(-1);
      }
      try {
        const response = await KeysService().getById(parseInt(id!));
        if (response) {
          setKey(response as Key);
        }
      } catch (error) {
        console.error("Error fetching key:", error);
        toast.error("Loading error!");
      }
    };
    fetchKey();
  }, [id, copied, navigate]);

  const copyToClipboard = async () => {
    if (key?.password) {
      navigator.clipboard.writeText(key.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }

    try {
      await HistoricService().add(parseInt(id!)); // salvando - saving
      toast.success("Copied");
    } catch {
      toast.error("Error saving new entry");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await KeysService().remove(key!.id!);
      if (response) {
        toast.success("Key sucessfuly removed");
      }
    } catch (error) {
      toast.error("Error removing key");
      console.error("Error deleting key:", error);
    }
    navigate(-1);
  };

  if (!key) return null;

  return (
    <div className="min-h-screen pb-24 md:pb-8 bg-warm-cream">
      <NavBar />
      <main className="max-w-2xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-vault-text hover:text-forest-green mb-6 transition-colors"
        >
          <HiChevronLeft size={20} />
          <span>Back to Vault</span>
        </button>

        <header className="mb-8">
          <MainTitle text={key.title} className="mb-2" />
          <p className="text-vault-text font-nunito">
            {key.description || "No description provided."}
          </p>
        </header>

        <div className="space-y-6">
          {/* Secret Value Card */}
          <div className="bg-vault-card p-6 rounded-xl border border-gray-100 dark:border-emerald-500 shadow-sm">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Secret Value
            </label>
            <div className="flex items-center justify-between gap-4">
              <input
                type="password"
                readOnly
                value={key.password}
                className="bg-transparent text-xl font-mono text-vault-text-bold w-full outline-none"
              />
              <button
                onClick={copyToClipboard}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                  copied
                    ? "bg-warm-amber text-white"
                    : "bg-forest-green text-white hover:bg-forest-green/90"
                }`}
              >
                <HiOutlineDuplicate size={20} />
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-vault-card p-4 rounded-xl border border-gray-100 dark:border-emerald-500 shadow-sm flex items-center gap-3">
              <div className="p-2 bg-green-50 text-forest-green rounded-lg">
                <HiOutlineShieldCheck size={20}/>
              </div>

              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">
                  Trust Level
                </p>

                <p className="text-sm font-bold text-vault-text-bold">{key.secure}</p>
              </div>
            </div>
          </div>

          {/* Audit Log */}
          <div className="space-y-4">
            <SubTitle text="Recent Activity" />
            <div className="bg-vault-card rounded-xl border border-gray-100 dark:border-emerald-500 overflow-hidden ">
              {key.historic?.map((item, index) => (
                <div
                  className="p-4 border-b border-gray-50 dark:border-emerald-500 last:border-none flex items-center justify-between"
                  key={index}
                >
                  <span className="text-sm text-vault-text">Key copied!</span>
                  <span className="text-xs text-gray-400">
                    {`${item.date} - ${item.time}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Destructive Action */}
          <div className="pt-8">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-red-500 font-bold border border-red-100 hover:bg-red-100 dark:hover:bg-red-50 transition-colors"
            >
              <HiOutlineTrash size={20} />
              <span>Delete Secret</span>
            </button>
          </div>
        </div>
      </main>

      {/* Trocar modal pra um componente depois */}
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal
          onConfirm={handleDelete}
          setShowModal={setShowDeleteModal}
          confirmationText="Yes, delete key"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiOutlineTrash size={32} />
            </div>
            
            <h3 className="text-xl font-bold text-vault-text-bold font-literata">
              Confirm Deletion
            </h3>

            <p className="text-vault-text mt-2">
              This action is permanent. You will lose access to any backups
              encrypted with this key.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default DetailKeyPage;
