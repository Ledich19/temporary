import mockCategories from '@/mock/mockForPopularCategories';
import PopularCategories from '@/component/PopularCategories/PopularCategories';
import { ProductCarousel } from '@/component/ProductCarousel';

export default async function Home() {
	return (
		<main>
			<PopularCategories categories={mockCategories} className={'popular-categories'} />
			<ProductCarousel />
			{/* <MCardsCarousel productsList={products} /> */}
		</main>
	);
}
