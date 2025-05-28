import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="px-4 py-6">{children}</main>
      <Footer />
    </>
  )
}

export default MainLayout
