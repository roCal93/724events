import { fireEvent, render, screen } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);
    const eventList = screen.getByTestId("event-list");
    expect(eventList).toBeInTheDocument();

  })
  it("a list a people is displayed", () => {
    render(<Home />);
    const peopleList = screen.getAllByTestId("people-list");
    expect(peopleList.length).toBeGreaterThan(1)

  })
  it("a footer is displayed", () => {
    render(<Home />);
    const footer = document.querySelector("footer");
    expect(footer).toBeInTheDocument();
  })
  it("an event card, with the last event, is displayed", async () => {
    const fakeData = {
      events: [
        {
          id: 1,
          date: "2024-01-01",
          title: "Last Event",
          cover: "/path/to/image.jpg",
          type: "conférence",
          description: "description de l'événement"
        },
        {
          id: 2,
          date: "2023-12-31",
          title: "Older Event",
          cover: "/path/to/image.jpg",
          type: "soirée",
          description: "description de l'événement"
        }
      ],
      focus: [
        {
          id: 1,
          title: "Focus 1",
          description: "Description focus 1",
          date: "2023-01-01",
        }
      ]
    };


    api.loadData = jest.fn().mockResolvedValue(fakeData);

    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );


    const lastEventCard = await screen.findByTestId("last-event-card");

    expect(lastEventCard.querySelector('.EventCard__month').textContent).toBe("janvier");
  });
});