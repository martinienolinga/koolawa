<?php

/* @Framework/Form/radio_widget.html.php */
class __TwigTemplate_9497e45ba198baeccfd102a5b1cbbf52adb5630162200e842fe6d87f50762774 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_1627c707e39ef9f323577416cc58961b8c1bc6ea7ab501a90db069230ee662b2 = $this->env->getExtension("native_profiler");
        $__internal_1627c707e39ef9f323577416cc58961b8c1bc6ea7ab501a90db069230ee662b2->enter($__internal_1627c707e39ef9f323577416cc58961b8c1bc6ea7ab501a90db069230ee662b2_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/radio_widget.html.php"));

        // line 1
        echo "<input type=\"radio\"
    <?php echo \$view['form']->block(\$form, 'widget_attributes') ?>
    value=\"<?php echo \$view->escape(\$value) ?>\"
    <?php if (\$checked): ?> checked=\"checked\"<?php endif ?>
/>
";
        
        $__internal_1627c707e39ef9f323577416cc58961b8c1bc6ea7ab501a90db069230ee662b2->leave($__internal_1627c707e39ef9f323577416cc58961b8c1bc6ea7ab501a90db069230ee662b2_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/radio_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <input type="radio"*/
/*     <?php echo $view['form']->block($form, 'widget_attributes') ?>*/
/*     value="<?php echo $view->escape($value) ?>"*/
/*     <?php if ($checked): ?> checked="checked"<?php endif ?>*/
/* />*/
/* */
