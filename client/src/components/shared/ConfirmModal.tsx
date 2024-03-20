interface IConfirmModalProps {
    handleConfirm: () => void
    handleAbort: () => void
    showConfirmModal: boolean
}

function ConfirmModal({ handleConfirm, handleAbort }: IConfirmModalProps) {
  return (
    <div className="fixed top-[20%] mx-auto rounded-lg shadow-lg border-slate-800 border translate-x-[-50%] left-[50%] h-[200px] w-[350px] md:w-[550px] p-10 bg-slate-800">
      <div className="flex flex-col justify-between items-center h-full text-center">
        <p>Are you sure you want to remove this image from favorites?</p>
        <div className="">
                  <button onClick={handleConfirm}
                      className=" mr-2 border border-slate-700 rounded-lg my-2 px-4 py-1.5 hover:bg-slate-700 hover:shadow-sm hover:shadow-slate-800 hover:border-slate-700">
            Delete
          </button>
                  <button
                      onClick={handleAbort}
                      className="border border-slate-700 rounded-lg my-2 px-4 py-1.5 hover:bg-slate-700 hover:shadow-sm hover:shadow-slate-800 hover:border-slate-700">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmModal;
