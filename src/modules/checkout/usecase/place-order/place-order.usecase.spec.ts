import PlaceOrderUseCase from "./place-order.usecase"
import { PlaceOrderInputDto } from "./place-order.dto"
import Product from "../../domain/product.entity"
import Id from "../../../@shared/domain/value-object/id.value-object";

describe("PlaceOrderUseCase unit test", () => {
  describe("validateProducts method", () => {
    it("should throw error if no products are selected", async() => {
      const mockStoreCatalogFacade = {
        find: jest.fn().mockResolvedValue(null),
        findAll: jest.fn().mockResolvedValue(null),
      }

      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
        add: jest.fn().mockResolvedValue(null)
      }

      const mockProductFacade = {
        checkStock: jest.fn().mockResolvedValue(null),
        addProduct: jest.fn().mockResolvedValue(null)
      };

      const placeOrderUseCase = new PlaceOrderUseCase(
        mockClientFacade,
        mockProductFacade,
        mockStoreCatalogFacade,
        null,
        null,
        null
      );

      const input: PlaceOrderInputDto = { clientId: "0", products: [] };

      await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow("No products selected")
    })
  });

  describe("getProducts method", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      // jest.setSystemTime(mockDate);
    });

    afterAll(() => {
      jest.useRealTimers;
    });

    it("should throw an error when product not found", async() => {
      const mockStoreCatalogFacade = {
        find: jest.fn().mockResolvedValue(null),
        findAll: jest.fn().mockResolvedValue(null),
      }

      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
        add: jest.fn().mockResolvedValue(null)
      }

      const mockProductFacade = {
        checkStock: jest.fn().mockResolvedValue(null),
        addProduct: jest.fn().mockResolvedValue(null)
      };

      const placeOrderUseCase = new PlaceOrderUseCase(
        mockClientFacade,
        mockProductFacade,
        mockStoreCatalogFacade,
        null,
        null,
        null
      );

      const input: PlaceOrderInputDto = { clientId: "0", products: [] };

      await expect(placeOrderUseCase["getProduct"]("0")).rejects.toThrow(
        new Error("Product not found")
      )
    })

    it("should return a product", async() => {
      const mockStoreCatalogFacade = {
        find: jest.fn().mockResolvedValue({
          id: "0",
          name: "Product 0",
          description: "Product 0 description",
          salesPrice: 0,
        }),
        findAll: jest.fn().mockResolvedValue(null),
      }

      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
        add: jest.fn().mockResolvedValue(null)
      }

      const mockProductFacade = {
        checkStock: jest.fn().mockResolvedValue(null),
        addProduct: jest.fn().mockResolvedValue(null)
      };

      const placeOrderUseCase = new PlaceOrderUseCase(
        mockClientFacade,
        mockProductFacade,
        mockStoreCatalogFacade,
        null,
        null,
        null
      );

      await expect(placeOrderUseCase["getProduct"]("0")).resolves.toEqual(
        new Product({
          id: new Id("0"),
          name: "Product 0",
          description: "Product 0 description",
          salesPrice: 0,
        })
      )

      expect(mockStoreCatalogFacade.find).toHaveBeenCalledTimes(1);
    });
  })

  it("should throw error when products is out of stock", async() => {
    const mockStoreCatalogFacade = {
      find: jest.fn().mockResolvedValue(null),
      findAll: jest.fn().mockResolvedValue(null),
    }

    const mockClientFacade = {
      find: jest.fn().mockResolvedValue(null),
      add: jest.fn().mockResolvedValue(null)
    }

    const mockProductFacade = {
      checkStock: jest.fn(({ productId }: { productId: string }) =>
        Promise.resolve({
          productId,
          stock: productId ==="1" ? 0 : 1,
        })
      ),
      addProduct: jest.fn().mockResolvedValue(null)
    };

    const placeOrderUseCase = new PlaceOrderUseCase(
      mockClientFacade,
      mockProductFacade,
      mockStoreCatalogFacade,
      null,
      null,
      null
    );

    let input: PlaceOrderInputDto = { clientId: "0", products: [{ productId: "1" }] };

    await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow("Product 1 is not available in stock")

    input = { clientId: "0", products: [{ productId: "0" }, { productId: "1" }] };

    await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow("Product 1 is not available in stock")

    expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3)

    input = { clientId: "0", products: [{ productId: "0" }, { productId: "1" }, { productId: "2" }] };

    await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow("Product 1 is not available in stock")

    expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5)
  });

  describe("execute method", () => {
    it("should throw an error when client not found", async() => {
      const mockStoreCatalogFacade = {
        find: jest.fn().mockResolvedValue(null),
        findAll: jest.fn().mockResolvedValue(null),
      }

      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
        add: jest.fn().mockResolvedValue(null)
      }

      const mockProductFacade = {
        checkStock: jest.fn().mockResolvedValue(null),
        addProduct: jest.fn().mockResolvedValue(null)
      };

      const placeOrderUseCase = new PlaceOrderUseCase(
        mockClientFacade,
        mockProductFacade,
        mockStoreCatalogFacade,
        null,
        null,
        null
      );

      const input: PlaceOrderInputDto = { clientId: "0", products: [] };

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error("Client not found")
      )
    })

    it("should throw an error when products are not valid", async() => {
      const mockStoreCatalogFacade = {
        find: jest.fn().mockResolvedValue(null),
        findAll: jest.fn().mockResolvedValue(null),
      }

      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(true),
        add: jest.fn().mockResolvedValue(null)
      }

      const mockProductFacade = {
        checkStock: jest.fn().mockResolvedValue(null),
        addProduct: jest.fn().mockResolvedValue(null)
      };

      const placeOrderUseCase = new PlaceOrderUseCase(
        mockClientFacade,
        mockProductFacade,
        mockStoreCatalogFacade,
        null,
        null,
        null
      );

      const mockValidateProducts =
        //@ts-expect-error - spy on private method
        jest.spyOn(placeOrderUseCase, "validateProducts")
        //@ts-expect-error - not return never
        .mockRejectedValue(new Error("No products selected"))

      const input: PlaceOrderInputDto = { clientId: "1", products: [] };

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error("No products selected"))

      expect(mockValidateProducts).toHaveBeenCalledTimes(1)
    })

    describe("place an order", () => {
      const clientProps = {
        id: "1c",
        name: "Client 0",
        document: "0000",
        email: "client@user.com",
        street: "some address",
        number: "1",
        complement: "",
        city: "some city",
        state: "some state",
        zipCode: "000",
      }

      const mockStoreCatalogFacade = {
        find: jest.fn().mockResolvedValue(null),
        findAll: jest.fn().mockResolvedValue(null),
      }

      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(clientProps),
        add: jest.fn().mockResolvedValue(null)
      }

      const mockProductFacade = {
        checkStock: jest.fn().mockResolvedValue(null),
        addProduct: jest.fn().mockResolvedValue(null)
      };

      const mockPaymentFacade = {
        process: jest.fn(),
      }

      const mockCheckoutRepo = {
        addOrder: jest.fn(),
      }

      const mockInvoiceFacade = {
        find: jest.fn().mockResolvedValue(null),
        generate: jest.fn().mockResolvedValue({ id: "1i" })
      }

      const placeOrderUseCase = new PlaceOrderUseCase(
        mockClientFacade as any,
        mockProductFacade as any,
        mockStoreCatalogFacade as any,
        mockCheckoutRepo as any,
        mockInvoiceFacade as any,
        mockPaymentFacade as any,
      )

      const products = {
        "1": new Product({
          id: new Id("1"),
          name: "Product 1",
          description: "some description",
          salesPrice: 40,
        }),
        "2": new Product({
          id: new Id("2"),
          name: "Product 2",
          description: "some description",
          salesPrice: 30,
        })
      }

      const mockValidateProducts = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, "validateProducts")
        //@ts-expect-error - not return never
        .mockResolvedValue(null);


      const mockGetProduct = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, "getProduct")
        //@ts-expect-error - not return never
        .mockImplementation((productId: keyof typeof products) => {
          return products[productId];
        })

      it("should not be approved", async() => {
        mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
          transactionId: "1t",
          orderId: "1o",
          amount: 100,
          status: "error",
          createdAt: new Date(),
          updatedAt: new Date()
        })

        const input: PlaceOrderInputDto = {
          clientId: "1c",
          products: [{ productId: "1" }, { productId: "2" }],
        }

        let output = await placeOrderUseCase.execute(input);

        expect(output.invoiceId).toBeNull();
        expect(output.total).toBe(70);
        expect(output.products).toStrictEqual([
          { productId: "1" }, { productId: "2" }
        ])
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c" });
        expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        expect(mockValidateProducts).toHaveBeenCalledWith(input);
        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith({ orderId: output.id, amount: output.total });

        expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(0);
      })

      it("should be approved", async() => {
        mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
          transactionId: "1t",
          orderId: "1o",
          amount: 100,
          status: "approved",
          createdAt: new Date(),
          updatedAt: new Date()
        })

        const input: PlaceOrderInputDto = {
          clientId: "1c",
          products: [{ productId: "1" }, { productId: "2" }],
        }

        let output = await placeOrderUseCase.execute(input);

        expect(output.invoiceId).toBeDefined();
        expect(output.total).toBe(70);
        expect(output.products).toStrictEqual([
          { productId: "1" }, { productId: "2" }
        ])
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c" });
        expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith({ orderId: output.id, amount: output.total });

        expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(1);
        expect(mockInvoiceFacade.generate).toHaveBeenCalledWith({
          name: clientProps.name,
          document: clientProps.document,
          street: clientProps.street,
          number: clientProps.number,
          complement: clientProps.complement,
          city: clientProps.city,
          state: clientProps.state,
          zipCode: clientProps.zipCode,
          items: [
            {
              id: products["1"].id.id,
              name: products["1"].name,
              price: products["1"].salesPrice,
            },
            {
              id: products["2"].id.id,
              name: products["2"].name,
              price: products["2"].salesPrice,
            }
          ]
        });
      })
    })
  })
})
