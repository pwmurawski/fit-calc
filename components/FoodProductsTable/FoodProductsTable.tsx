import InfiniteScroll from 'react-infinite-scroll-component';
import { FoodProductType } from '../../types/FoodProduct';
import Loading from '../Loading/Loading';
import FoodProducts from './FoodProducts/FoodProducts';
import { Container } from './styles/styles';

interface IFoodProductsTableProps {
    foodProductsData: FoodProductType[] | undefined;
    pagination?: {
        isReachedEnd: boolean | undefined;
        loadingMore: boolean | undefined;
        size: number;
        setSize: (size: number) => void;
    };
}

export default function FoodProductsTable({ foodProductsData, pagination }: IFoodProductsTableProps) {
    if (!foodProductsData) return <Loading />;
    return (
        <Container id="scrollable">
            {pagination ? (
                <InfiniteScroll
                    next={() => pagination.setSize(pagination.size + 1)}
                    hasMore={!pagination.isReachedEnd}
                    loader={<div>loading...</div>}
                    dataLength={foodProductsData.length}
                    scrollableTarget="scrollable"
                >
                    <FoodProducts foodProductsData={foodProductsData} />
                </InfiniteScroll>
            ) : (
                <FoodProducts foodProductsData={foodProductsData} />
            )}
        </Container>
    );
}
