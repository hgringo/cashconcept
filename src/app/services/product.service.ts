import { Injectable } from '@angular/core';
import { IProduct, ProductType } from 'app/types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    #products : IProduct[] = [

        // CashBox S
        { 
          id: "65648d9c-2896-48e8-a6fd-4a60b9627d78", 
          name: 'CashBox S', 
          type: ProductType.COIN_CHANGER,
          image:  'assets/products/CashBox S/CashBox S_front.png',
          menu:   'assets/menu/CashBox S_front.webp',
          banner: 'assets/banner_slider/CashBox S_front.svg',
          gallery: [
            { src: "assets/products/CashBox S/CashBox S_front.png", thumbnail: "assets/products/CashBox S/thumbnails/CashBox S_front.png", isVideo: false },
            { src: "assets/products/CashBox S/CashBox S_side_face.png", thumbnail: "assets/products/CashBox S/thumbnails/CashBox S_side_face.png", isVideo: false },
            { src: "assets/products/CashBox S/CashBox S_integrated.png", thumbnail: "assets/products/CashBox S/thumbnails/CashBox S_integrated.png", isVideo: false },
            { src: "assets/products/CashBox S/CashBox S_posed.jpeg", thumbnail: "assets/products/CashBox S/thumbnails/CashBox S_posed.png", isVideo: false },
            { src: "assets/products/CashBox S/CashBox S_posed_2.jpeg", thumbnail: "assets/products/CashBox S/thumbnails/CashBox S_posed_2.png", isVideo: false },
            { src: "assets/products/CashBox S/CashBox S_posed_3.jpeg", thumbnail: "assets/products/CashBox S/thumbnails/CashBox S_posed_3.png", isVideo: false },
          ],
          technicalFeatures: [
            {'languageCode': 'fr', 'path': "assets/products/CashBox S/technical_features/fr/Fiche technique CashBox S.pdf"},
            {'languageCode': 'en', 'path': "assets/products/CashBox S/technical_features/en/Technical sheet CashBox S.pdf"},
            {'languageCode': 'nl', 'path': "assets/products/CashBox S/technical_features/nl/Technische gegevensbladen CashBox S.pdf"},
          ],
          isCompared: false,
          acceptVerify: true,
          acceptBundle: false,
          redistributeAll: false,
          nbRedistribute: 3,
          typeOfTicket: "(5-10-20€)",
          recycler: true,
          nbRecycler: 1,
          nbTicket: 80,
          nbTicket2: 500,
          redistributeBundle: false,
          fakeMoney: true,
          nbDistributor: 1,
          shieldingMM: 2,
          transponder: false,
          laptop: true,
          inche: 15,
          screenTactical: true,
          screenTacticalInche: 10,
          calculator: true,
          application: true,
          os: true,
          twiceDimensions: false,
          length: 36.5,
          depth: 38,
          height: 55.8,
          weight: 35
        },  

        // CashBox Mini
        { 
          id: "292af756-288c-4942-a6f3-c7d69f889529", 
          name: 'CashBox Mini', 
          type: ProductType.COIN_CHANGER,
          image: 'assets/products/CashBox Mini/CashBox Mini_front.png',
          menu:   'assets/menu/CashBox Mini_front.webp',
          banner: 'assets/banner_slider/CashBox Mini_front.svg',
          gallery: [
            { src: "assets/products/CashBox Mini/CashBox Mini_front.png", thumbnail: "assets/products/CashBox Mini/thumbnails/CashBox Mini_front.webp", isVideo: false },
            { src: "assets/products/CashBox Mini/CashBox Mini_side_face.png", thumbnail: "assets/products/CashBox Mini/thumbnails/CashBox Mini_side_face.png", isVideo: false },
            { src: "assets/products/CashBox Mini/CashBox Mini_placed_on.jpg", thumbnail: "assets/products/CashBox Mini/thumbnails/CashBox Mini_placed_on.png", isVideo: false },
            { src: "assets/products/CashBox Mini/CashBox Mini_integrated_on.png", thumbnail: "assets/products/CashBox Mini/thumbnails/CashBox Mini_integrated_on.png", isVideo: false }
          ],
          technicalFeatures: [
            {'languageCode': 'fr', 'path': "assets/products/CashBox Mini/technical_features/fr/Fiche technique CashBox Mini.pdf"},
            {'languageCode': 'en', 'path': "assets/products/CashBox Mini/technical_features/en/Technical sheet  CashBox Mini.pdf"},
          ],
          isCompared: false,
          acceptVerify: true,
          redistributeAll: false,
          nbRedistribute: 2,
          typeOfTicket: "(5-10€) (5-20€) (10-20€)",
          recycler: true,
          nbRecycler: 2,
          nbTicket: 30,
          nbTicket2: 300,
          fakeMoney: true,
          nbDistributor: 1,
          shieldingMM: 2,
          transponder: true,
          monitor: true,
          inche: 12,
          screen: true,
          screenInche: 7,
          calculator: true,
          application: true,
          os: true,
          twiceDimensions: false,
          length: 29,
          depth: 36,
          height: 60,
          weight: 29
        },

        // CashBox 3
        { 
          id: "9c9172aa-d80e-4f84-a620-7dcf1c54e869", 
          name: 'CashBox 3',
          type: ProductType.COIN_CHANGER,
          image: 'assets/products/CashBox 3/CashBox 3_front.png',
          menu:   'assets/menu/CashBox 3_front.webp',
          banner: 'assets/banner_slider/CashBox 3_front.svg',
          gallery: [
            { src: "assets/products/CashBox 3/CashBox 3_front.png", thumbnail: "assets/products/CashBox 3/thumbnails/CashBox 3_front.png", isVideo: false },
            { src: "assets/products/CashBox 3/CashBox 3_side_face.png", thumbnail: "assets/products/CashBox 3/thumbnails/CashBox 3_side_face.png", isVideo: false },
            { src: "assets/products/CashBox 3/CashBox 3_integrated_on.png", thumbnail: "assets/products/CashBox 3/thumbnails/CashBox 3_integrated_on.png", isVideo: false },
            { src: "assets/products/CashBox 3/CashBox-3_placed_on.png", thumbnail: "assets/products/CashBox 3/thumbnails/CashBox-3_placed_on.png", isVideo: false },
            { src: "assets/products/CashBox 3/CashBox-3_on_base.png", thumbnail: "assets/products/CashBox 3/thumbnails/CashBox-3_on_base.png", isVideo: false }
          ],
          technicalFeatures: [
            {'languageCode': 'fr', 'path': "assets/products/CashBox 3/technical_features/fr/Fiche technique CashBox 3.pdf"},
            {'languageCode': 'en', 'path': "assets/products/CashBox 3/technical_features/en/Technical sheet   CashBox 3.pdf"},
          ],
          isCompared: false,
          acceptVerify: true,
          redistributeAll: false,
          nbRedistribute: 2,
          typeOfTicket: "(5-10€) (5-20€) (10-20€)",
          recycler: true,
          nbRecycler: 2,
          nbTicket: 100,
          nbTicket2: 400,
          fakeMoney: true,
          nbDistributor: 1,
          shieldingMM: 4,
          transponder: true,
          monitor: true,
          inche: 12,
          screen: true,
          screenInche: 7,
          calculator: true,
          application: true,
          os: true,
          twiceDimensions: false,
          length: 32.30,
          depth: 40.30,
          height: 58.50,
          weight: 60
        },

        // CashBox 5
        { 
          id: "597cb73c-6a8e-499e-8f5e-4fccb55879cc", 
          name: 'CashBox 5', 
          type: ProductType.COIN_CHANGER,
          image: 'assets/products/CashBox 5/CashBox 5_front.png',
          menu:   'assets/menu/CashBox 5_front.webp',
          banner: 'assets/banner_slider/CashBox 5_front.svg',
          gallery: [
            { src: "assets/products/CashBox 5/CashBox 5_front.png", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox 5_front.png", isVideo: false },
            { src: "assets/products/CashBox 5/CashBox 5_side_face.png", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox 5_side_face.png", isVideo: false },
            { src: "assets/products/CashBox 5/CashBox-5_placed_on.png", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox-5_placed_on.png", isVideo: false },
            { src: "assets/products/CashBox 5/CashBox 5_integrated_on_2.jpeg", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox 5_integrated_on_2.png", isVideo: false },
            { src: "assets/products/CashBox 5/CashBox-5_integrated_on_3.png", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox-5_integrated_on_3.png", isVideo: false },
            { src: "assets/products/CashBox 5/CashBox-5_on_base_2.png", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox-5_on_base_2.png", isVideo: false },
            { src: "assets/products/CashBox 5/CashBox-5_tamines.png", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox-5_tamines.png", isVideo: false },
            { src: "assets/products/CashBox 5/CashBox 5_on_base.png", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox 5_on_base.png", isVideo: false },
            { src: "assets/products/CashBox 5/CashBox-5_placed_on_2.png", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox-5_placed_on_2.png", isVideo: false },
            { src: "RTOwGZIoHeQ", thumbnail: 'assets/products/CashBox 5/thumbnails/CashBox 5_Demo.png', isVideo: true }
          ],
          technicalFeatures: [
            {'languageCode': 'fr', 'path': "assets/products/CashBox 5/technical_features/fr/Fiche technique CashBox 5.pdf"},
            {'languageCode': 'en', 'path': "assets/products/CashBox 5/technical_features/en/Technical sheet   CashBox 5.pdf"},
          ],
          isCompared: false,
          acceptVerify: true,
          redistributeAll: false,
          nbRedistribute: 4,
          typeOfTicket: "(5-10-20-50€)",
          recycler: true,
          nbRecycler: 4,
          nbTicket: 30,
          nbTicket2: 400,
          fakeMoney: true,
          nbDistributor: 1,
          shieldingMM: 4,
          transponder: true,
          monitor: true,
          inche: 12,
          screen: true,
          screenInche: 7,
          calculator: true,
          application: true,
          os: true,
          twiceDimensions: false,
          length: 32.30,
          depth: 40.30,
          height: 58.50,
          weight: 60
        },

        // CashBox Pro
        { 
          id: "a91ecc97-f2a0-47e3-820a-7a91cf3f619a", 
          name: 'CashBox Pro', 
          type: ProductType.COIN_CHANGER,
          image: 'assets/products/CashBox Pro/CashBox Pro_front.svg', 
          menu:   'assets/menu/CashBox Pro_front.webp',
          banner: 'assets/banner_slider/CashBox Pro_front.svg', 
          isCompared: false,
          gallery: [
            { src: "assets/products/CashBox Pro/CashBox Pro_front.png", thumbnail: "assets/products/CashBox Pro/thumbnails/CashBox Pro_front.png", isVideo: false },
            { src: "assets/products/CashBox Pro/CashBox Pro_2.png", thumbnail: "assets/products/CashBox Pro/thumbnails/CashBox Pro_2.png", isVideo: false },
            { src: "assets/products/CashBox Pro/CashBox-Pro_placed_on.png", thumbnail: "assets/products/CashBox Pro/thumbnails/CashBox-Pro_placed_on.png", isVideo: false },
            { src: "assets/products/CashBox Pro/CashBox-Pro_placed_on_2.png", thumbnail: "assets/products/CashBox Pro/thumbnails/CashBox-Pro_placed_on_2.png", isVideo: false },
            { src: "assets/products/CashBox Pro/CashBox-Pro_placed_on_3.png", thumbnail: "assets/products/CashBox Pro/thumbnails/CashBox-Pro_placed_on_3.png", isVideo: false },
          ],
          technicalFeatures: [
            {'languageCode': 'fr', 'path': "assets/products/CashBox Pro/technical_features/fr/Fiche technique CashBox Pro.pdf"},
            {'languageCode': 'en', 'path': "assets/products/CashBox Pro/technical_features/en/Technical sheet   CashBox Pro.pdf"},
          ],
          acceptVerify: true,
          redistributeAll: false,
          nbRedistribute: 4,
          typeOfTicket: "(5-10-20-50€)",
          recycler: true,
          nbRecycler: 4,
          nbTicket: 30,
          nbTicket2: 400,
          fakeMoney: true,
          nbDistributor: 8,
          shieldingMM: 4,
          monitor: true,
          inche: 12,
          screen: true,
          screenInche: 7,
          calculator: true,
          application: true,
          os: true,
          twiceDimensions: true,
          ticketLength: 22.70,
          ticketDepth: 60.50,
          ticketHeight: 29.50,
          coinLength: 30,
          coinDepth: 54.60,
          coinHeight: 33.60,
          weight: 92
        },

        // CashBox 7
        { 
          id: "65648d9c-2896-48e8-a6fd-7820b9627b89", 
          name: 'CashBox 7', 
          type: ProductType.COIN_CHANGER,
          image: 'assets/products/CashBox 7/CashBox 7_front.png',
          menu:   'assets/menu/CashBox 7_front.webp',
          banner: 'assets/banner_slider/CashBox 7_front.svg',
          gallery: [
            { src: "assets/products/CashBox 7/CashBox 7_front.png", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_front.png", isVideo: false },
            { src: "assets/products/CashBox 7/CashBox 7_side_face.png", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_side_face.png", isVideo: false },
            { src: "assets/products/CashBox 7/CashBox 7_on_base.png", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_on_base.png", isVideo: false },
            { src: "assets/products/CashBox 7/CashBox 7_on_base_2.jpg", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_on_base_2.png", isVideo: false },
            { src: "assets/products/CashBox 7/CashBox 7_integrated_on.jpg", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_integrated_on.png", isVideo: false },
            { src: "assets/products/CashBox 7/CashBox 7_integrated_on_2.jpg", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_integrated_on_2.png", isVideo: false },
            { src: "assets/products/CashBox 7/CashBox 7_integrated_on_3.jpg", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_integrated_on_3.png", isVideo: false },
            { src: "assets/products/CashBox 7/CashBox 7_placed_on.jpg", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_placed_on.png", isVideo: false },
            { src: "assets/products/CashBox 7/CashBox 7_placed_on_2.png", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_placed_on_2.png", isVideo: false },
            { src: "assets/products/CashBox 7/CashBox 7_placed_on_3.png", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_placed_on_3.png", isVideo: false }
          ],
          technicalFeatures: [
            {'languageCode': 'fr', 'path': "assets/products/CashBox 7/technical_features/fr/Fiche technique CashBox 7.pdf"},
            {'languageCode': 'en', 'path': "assets/products/CashBox 7/technical_features/en/Technical sheet CashBox 7.pdf"},
            {'languageCode': 'nl', 'path': "assets/products/CashBox 7/technical_features/nl/Technische gegevensbladen CashBox 7.pdf"},
          ],
          isCompared: false,
          acceptVerify: true,
          acceptBundle: false,
          redistributeAll: false,
          nbRedistribute: 4,
          typeOfTicket: "(5-10-20-50€)",
          recycler: true,
          nbRecycler: 4,
          nbTicket: 45,
          nbTicket2: 600,
          redistributeBundle: true,
          nbRedistributeBundle: 15,
          fakeMoney: true,
          nbDistributor: 8,
          shieldingMM: 4,
          transponder: true,
          laptop: true,
          inche: 15,
          screenTactical: true,
          screenTacticalInche: 10,
          calculator: true,
          application: true,
          os: true,
          twiceDimensions: false,
          length: 56,
          depth: 46.50,
          height: 59.20,
          weight: 70
        },

        // CashBox 7+
        { 
          id: "65648d9c-2896-48e8-a6fd-7820b9627f70", 
          name: 'CashBox 7+', 
          type: ProductType.COIN_CHANGER,
          image: 'assets/products/CashBox 7+/CashBox 7+.svg',
          menu:   'assets/menu/CashBox 7+_front.webp',
          banner: 'assets/banner_slider/CashBox 7+_front.svg',
          gallery: [
            { src: "assets/products/CashBox 7+/CashBox 7+.png", thumbnail: "assets/products/CashBox 7+/thumbnails/CashBox 7+.png", isVideo: false },
            { src: "assets/products/CashBox 7+/CashBox 7+_on_base.png", thumbnail: "assets/products/CashBox 7+/thumbnails/CashBox 7+_on_base.png", isVideo: false },
            { src: "assets/products/CashBox 7+/CashBox 7+_placed_on.png", thumbnail: "assets/products/CashBox 7+/thumbnails/CashBox 7+_placed_on.png", isVideo: false },
          ],
          technicalFeatures: [
            {'languageCode': 'fr', 'path': "assets/products/CashBox 7+/technical_features/fr/Fiche technique CashBox 7+.pdf"},
            {'languageCode': 'en', 'path': "assets/products/CashBox 7+/technical_features/en/Technical sheet   CashBox 7+.pdf"},
          ],
          isCompared: false,
          acceptVerify: true,
          acceptBundle: true,
          nbAccept: 50,
          redistributeAll: false,
          nbRedistribute: 4,
          typeOfTicket: "(5-10-20-50€)",
          recycler: true,
          nbRecycler: 4,
          nbTicket: 60,
          nbTicket2: 1500,
          redistributeBundle: true,
          nbRedistributeBundle: 20,
          fakeMoney: true,
          nbDistributor: 8,
          shieldingMM: 4,
          transponder: true,
          monitor: true,
          inche: 12,
          screen: true,
          screenInche: 7,
          calculator: true,
          application: true,
          os: true,
          twiceDimensions: true,
          ticketLength: 25.60,
          ticketDepth: 62,
          ticketHeight: 54.10,
          coinLength: 30,
          coinDepth: 54.60,
          coinHeight: 33.60,
          weight: 120
        },

        // CashBox 8
        { 
          id: "65648d9c-2896-48e8-a6fd-7820b9627f10", 
          name: 'CashBox 8', 
          type: ProductType.COIN_CHANGER,
          image: 'assets/products/CashBox 8/CashBox 8_2.svg',
          menu:   'assets/menu/CashBox 8_front.webp',
          banner: 'assets/banner_slider/CashBox 8_front.svg', 
          gallery: [
            { src: "assets/products/CashBox 8/CashBox 8.png", thumbnail: "assets/products/CashBox 8/thumbnails/CashBox 8.png", isVideo: false },
            { src: "assets/products/CashBox 8/CashBox 8_2.png", thumbnail: "assets/products/CashBox 8/thumbnails/CashBox 8_2.png", isVideo: false },
            { src: "assets/products/CashBox 8/CashBox 8_placed_on.png", thumbnail: "assets/products/CashBox 8/thumbnails/CashBox 8_placed_on.png", isVideo: false },
            { src: "assets/products/CashBox 8/CashBox 8_integrated.png", thumbnail: "assets/products/CashBox 8/thumbnails/CashBox 8_integrated.png", isVideo: false },
          ],
          technicalFeatures: [
            {'languageCode': 'fr', 'path': "assets/products/CashBox 8/technical_features/fr/Fiche technique CashBox 8.pdf"},
            {'languageCode': 'en', 'path': "assets/products/CashBox 8/technical_features/en/Technical sheet   CashBox 8.pdf"},
          ],
          isCompared: false,
          acceptVerify: true,
          acceptBundle: true,
          nbAccept: 50,
          redistributeAll: false,
          nbRedistribute: 6,
          typeOfTicket: "(5-10-20-50-100-200€)",
          recycler: true,
          nbRecycler: 6,
          nbTicket: 60,
          nbTicket2: 1500,
          redistributeBundle: true,
          nbRedistributeBundle: 20,
          fakeMoney: true,
          nbDistributor: 8,
          shieldingMM: 4,
          transponder: true,
          monitor: true,
          inche: 12,
          screen: true,
          screenInche: 7,
          calculator: true,
          application: true,
          os: true,
          twiceDimensions: true,
          ticketLength: 25.60,
          ticketDepth: 62, 
          ticketHeight: 65,
          coinLength: 30,
          coinDepth: 54.60,
          coinHeight: 33.60,
          weight: 130
        },
        // CashBox Order 2
        { 
          id: "65648d9c-2896-48e8-a6fd-7820b9627f4z", 
          name: 'CashBox Order 2', 
          type: ProductType.CONTROL_TERMINAL,
          image: 'assets/products/CashBox Order 2-4/CashBox Order 2_2_front.png',
          menu:   'assets/menu/CashBox Order 2_2_front.webp',
          banner: 'assets/banner_slider/CashBox Order 2_front.svg',
          gallery: [
            { src: 'assets/products/CashBox Order 2-4/CashBox Order 2_front.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order 2_front.png', isVideo: false },
            { src: 'assets/products/CashBox Order 2-4/CashBox Order 2_side_face.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order 2_side_face.png', isVideo: false },
            { src: 'assets/products/CashBox Order 2-4/CashBox Order 2_2_front.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order 2_2_side_face.png', isVideo: false },
            { src: 'assets/products/CashBox Order 2-4/CashBox Order 2_2_side_face.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order 2_2_side_face.png', isVideo: false },
            { src: 'assets/products/CashBox Order 2-4/CashBox Order 4_front.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order 4_front.png', isVideo: false },
            { src: 'assets/products/CashBox Order 2-4/CashBox Order 4_2_front.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order 4_2_front.png', isVideo: false },
            { src: 'assets/products/CashBox Order 2-4/CashBox Order - Fastfood.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order - Fastfood.png', isVideo: false },
            { src: 'assets/products/CashBox Order 2-4/CashBox Order - Fastfood_2.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order - Fastfood_2.png', isVideo: false }
          ],
          technicalFeatures: [
            {'languageCode': 'fr', 'path': "assets/products/CashBox Order 2-4/technical_features/fr/Fiche technique CashBox Order 2.pdf"},
            {'languageCode': 'en', 'path': "assets/products/CashBox Order 2-4/technical_features/en/Technical sheet CashBox Order 2.pdf"},
          ],    
          isCompared: false,
          acceptVerify: true,
          redistributeAll: false,
          nbRedistribute: 2,
          typeOfTicket: "(5-10€) (5-20€) (10-20€)",
          recycler: true,
          nbRecycler: 2,
          nbTicket: 100,
          nbTicket2: 400,
          fakeMoney: true,
          nbDistributor: 1,
          shieldingMM: 2.5,
          screenTactical: true,
          screenTacticalInche: 27,
          program: true,
          printer: true,
          application: true,
          leds: true,
          os: true,
          twiceDimensions: false,
          length: 46,
          depth: 37.70,
          height: 186.20,
          weight: 180
        },

        // CashBox Order 4
        { 
          id: "65648d9c-2896-48e8-a6fd-7820b9627f7a", 
          name: 'CashBox Order 4', 
          type: ProductType.CONTROL_TERMINAL,
          image: 'assets/products/CashBox Order 2-4/CashBox Order 4_2_front.png',
          menu:   'assets/menu/CashBox Order 4_2_front.webp',
          banner: 'assets/banner_slider/CashBox Order 4_front.svg',
          gallery: [
            { src: 'assets/products/CashBox Order 2-4/CashBox Order 4_front.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order 4_front.png', isVideo: false },
            { src: 'assets/products/CashBox Order 2-4/CashBox Order 4_2_front.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order 4_2_front.png', isVideo: false },
            { src: 'assets/products/CashBox Order 2-4/CashBox Order 2_front.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order 2_front.png', isVideo: false },
            { src: 'assets/products/CashBox Order 2-4/CashBox Order 2_side_face.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order 2_side_face.png', isVideo: false },
            { src: 'assets/products/CashBox Order 2-4/CashBox Order 2_2_front.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order 2_2_front.png', isVideo: false },
            { src: 'assets/products/CashBox Order 2-4/CashBox Order 2_2_side_face.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order 2_2_side_face.png', isVideo: false },
            { src: 'assets/products/CashBox Order 2-4/CashBox Order - Fastfood.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order - Fastfood.png', isVideo: false },
            { src: 'assets/products/CashBox Order 2-4/CashBox Order - Fastfood_2.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order - Fastfood_2.png', isVideo: false }
          ],
          technicalFeatures: [
            {'languageCode': 'fr', 'path': "assets/products/CashBox Order 2-4/technical_features/fr/Fiche technique CashBox Order 4.pdf"},
            {'languageCode': 'en', 'path': "assets/products/CashBox Order 2-4/technical_features/en/Technical sheet CashBox Order 4.pdf"},
          ],           
          isCompared: false,
          acceptVerify: true,
          redistributeAll: false,
          nbRedistribute: 4,
          typeOfTicket: "(5-10-20-50€)",
          recycler: true,
          nbRecycler: 4,
          nbTicket: 30,
          nbTicket2: 400,
          fakeMoney: true,
          nbDistributor: 1,
          shieldingMM: 2.5,
          screen: true,
          screenInche: 27,
          program: true,
          printer: true,
          application: true,
          leds: true,
          os: true,
          twiceDimensions: false,
          length: 46,
          depth: 37.70,
          height: 186.20,
          weight: 180
        }
    ];

  constructor() { }

  getProducts(type?: ProductType) : IProduct[] {
    if (type) {
      return this.#products.filter(product => product.type === type);
    }
    else {
      return this.#products;
    }
  }

  getProductById(id: string): IProduct | undefined {
    return this.#products.find(product => product.id === id);
  }
}
