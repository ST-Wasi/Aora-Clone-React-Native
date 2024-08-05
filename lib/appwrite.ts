
import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: "com.wahr.aorabywasi",
    projectId: "65e8179edbbaca8ea496",
    databaseId: "66afbfa9001aeb402d96",
    userCollectionId: "66afbfc80035c541e978",
    videoCollectionId: "66afbff100004c6d6a27",
    storageId: "66afc13c001f4e6f2725"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createNewUser = async (email: string, password: string, username: string | undefined) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username)

        if (!newAccount) throw new Error('Account not created')

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            username,
            email,
            avatar: avatarUrl
        })

        return newUser;
    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}

export const signIn = async (email: string, password: any) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentLoggedInUser = await account.get()
        if (!currentLoggedInUser) throw new Error('No user found')
        const userDocuments = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentLoggedInUser.$id)]
        );

        if (!userDocuments || userDocuments.total === 0) throw new Error('No user found');

        const currentUser = userDocuments.documents[0];
        return currentUser;
    } catch (error) {
        console.log(error)
    }
}