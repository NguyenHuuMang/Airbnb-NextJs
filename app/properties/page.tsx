import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";


const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState
                title="Không được phép"
                subtitle="Hãy đăng nhập"
            />
        )
    }

    const listings = await getListings({ userId: currentUser.id })

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Không tìm thấy"
                    subtitle="Có vẻ như bạn không có tài khoản."
                />
            </ClientOnly>
        )
    }

    return ( 
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
     );
}
 
export default PropertiesPage;