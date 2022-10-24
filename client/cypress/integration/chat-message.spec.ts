type IRooms = {
  id: string
  name: string
}

type IResponse = {
  body: {
    body: { rooms: IRooms[] }
  }
}

describe('Testing a Chat Application', () => {
  it('Create a new rom', () => {
    cy.visit('/')
    cy.get('[data-cy=username]').click()
    cy.get('[data-cy=username]').type('Dibreison')
    cy.get('.chakra-button').click()
    cy.get('#room').click()
    cy.get('#room').type('grupo_para_teste')
    cy.get('.chakra-button').click()
    cy.get('[data-cy=grupo_para_teste]').should('exist')
  })

  it('Delete a new rom', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy=username]').click()
    cy.get('[data-cy=username]').type('Dibreison')
    cy.get('.chakra-button').click()
    cy.get('[data-cy=delete_grupo_para_teste]').click()
    cy.wait(1000)
    cy.get('[data-cy=grupo_para_teste]').should('not.exist')
  })

  it('Get rooms from API and show', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy=username]').click()
    cy.get('[data-cy=username]').type('Dibreison')
    cy.get('.chakra-button').click()
    cy.request('http://localhost:4000/rooms')
      .as('roomsRequest')
      .get('@roomsRequest')
      .then((response: IResponse) => {
        cy.task('log', response)
        data.body.body.rooms.map((room) => {
          cy.get(`[data-cy=${room.name}]`).should('exist')
        })
      })
  })
})

export {}
