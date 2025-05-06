const usuarios = async () => {
    const users = []

    for (let i = 0; i < 10; i++) {
        users.push({
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            image: faker.image.avatar()
        });
    }

    return users
}

module.exports = {
    usuarios
}