const menu = [
  // {
  //   title: "Danh mục sản phẩm",
  //   items: [
  //     { name: "Quần áo nữ", link: "?category=quan-ao-nu" },
  //     { name: "Quần áo nam", link: "?category=quan-ao-nam" },
  //     { name: "Quần áo bé gái", link: "/quan-ao-be-gai" },
  //     { name: "Quần áo bé trai", link: "/quan-ao-be-trai" },
  //   ],
  // },
  {
    title: "Thương hiệu",
    keyName: "brand",
    items: [
      { name: "ADIDAS", link: "?brand=ADIDAS" },
      { name: "Gucci", link: "?brand=gucci" },
      { name: "No brand", link: "?brand=No%20brand" },
    ],
  },
  {
    title: "Loại sản phẩm",
    keyName: "type",
    items: [
      { name: "Áo khoác", link: "?type=Áo khoác" },
      { name: "Áo thun", link: "?type=Áo thun" },
      { name: "Ngắn tay", link: "?type=Ngắn tay" },
      { name: "Dài tay", link: "?type=Dài tay" },
      { name: "Sơ mi", link: "?type=Sơ mi" },
      { name: "Khác", link: "?type=Khác" },
    ],
  },
  {
    title: "Nhãn sản phẩm",
    keyName: "label",
    items: [
      { name: "Đi chơi", link: "?label=đi chơi" },
      { name: "Đồ ngủ", link: "?label=đồ ngủ" },
      { name: "Khác", link: "?label=Khác" },
    ],
  },
];

export default menu;
