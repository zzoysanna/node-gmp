console.log('enter string:');
process.stdin.on('data', (data: Buffer) => {
    process.stdout.write(
        'result: ' + data.toString().split('').reverse().join('').trim() +
        "\n\n" +
        'enter another one: '
    )
});
