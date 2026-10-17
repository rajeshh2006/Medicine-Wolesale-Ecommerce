import toast from 'react-hot-toast';

const successAlert = (title) => {
  return toast.success(title || "Success!", {
    duration: 3000,
    position: 'top-center',
    style: {
      background: '#047857',
      color: '#fff',
      fontWeight: '600',
      borderRadius: '8px',
      padding: '12px 20px',
    }
  });
};

export default successAlert;
