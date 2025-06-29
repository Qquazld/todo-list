function Footer() {
  return (
    <footer className="w-full mt-8 py-4 text-xs bg-white text-gray-500 border-t border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
      <div className="max-w-4xl mx-auto text-center">
        © {new Date().getFullYear()} Yann Letertre
      </div>
    </footer>
  );
}
export default Footer;
