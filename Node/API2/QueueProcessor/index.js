module.exports = async function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
    const secret3 = process.env.secret3;
    context.log('secret 3:', secret3);
};
