module.exports = async function (context, myQueueItem) {
    const secret3 = process.env.secret1;
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
    context.log('secret 3:', secret3);
};
