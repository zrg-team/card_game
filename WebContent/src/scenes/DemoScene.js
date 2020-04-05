const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export default class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'DemoScene'
        })
    }

    preload() {
      this.load.image('logo-card', 'assets/images/logo-card.png')
    }

    create() {
        this.print = this.add.text(0, 0, '');

        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400,
            y: 200,
            width: 800,
            height: 400,

            scrollMode: 1,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),

            panel: {
                child: this.rexUI.add.sizer({
                    orientation: 'x',
                    space: {
                        left: 3,
                        right: 3,
                        top: 3,
                        bottom: 3,
                        item: 8,
                        line: 8,
                    }
                }),

                mask: {
                    padding: 1
                },
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
            }
        })
            .layout()
        .drawBounds(this.add.graphics(), 0xff0000);

        updatePanel(scrollablePanel, content);
    }

    update() { }
}

var updatePanel = function (panel, content) {
    var sizer = panel.getElement('panel');
    console.log('>>>>>>>>>', sizer)
    var scene = panel.scene;

    // sizer.clear(true);
    var lines = content.split('\n');
    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
        var words = lines[li].split(' ');
        for (var wi = 0, wcnt = words.length; wi < wcnt; wi++) {
            sizer.add(
              scene.rexUI.add.sizer({
                orientation: 'v',
                width: 250,
                height: 220
              }).add(
                scene.add.text(0, 0, words[wi], {
                  fontSize: 18
                })
              ).add(
                scene.add
                  .image(0, 0, 'logo-card')
                  .setDisplaySize(250, 220)
                  .setOrigin(0.5, 0.5)
                  .setInteractive()
                  .on('pointerdown', function () {
                    console.log('>>>>>>>>>>>>>>')
                      this.scene.print.text = this.text;
                      this.setTint(Phaser.Math.Between(0, 0xffffff))
                  }),
                null, // proportion
                'left', // align
                0, // paddingConfig
                true, // expand
              )
            );
        }
        if (li < (lcnt - 1)) {
            // sizer.addNewLine();
        }
    }


    panel.layout();
    return panel;
}

var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.
Along with the fantastic open source community, Phaser is actively developed and maintained by Photon Storm. As a result of rapid support, and a developer friendly API, Phaser is currently one of the most starred game frameworks on GitHub.
Thousands of developers from indie and multi-national digital agencies, and universities worldwide use Phaser. You can take a look at their incredible games.`;