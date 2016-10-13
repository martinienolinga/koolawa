<?php

/* @Framework/Form/collection_widget.html.php */
class __TwigTemplate_cecf08fcec2f850fb2dab74ce597f241b2c1ba0c89129a25c0d4e75f2f0af7e6 extends Twig_Template
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
        $__internal_4021ff2bf23212e30f855209838b9bc6609202cdfeca9d53ddf53718b08f2625 = $this->env->getExtension("native_profiler");
        $__internal_4021ff2bf23212e30f855209838b9bc6609202cdfeca9d53ddf53718b08f2625->enter($__internal_4021ff2bf23212e30f855209838b9bc6609202cdfeca9d53ddf53718b08f2625_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/collection_widget.html.php"));

        // line 1
        echo "<?php if (isset(\$prototype)): ?>
    <?php \$attr['data-prototype'] = \$view->escape(\$view['form']->row(\$prototype)) ?>
<?php endif ?>
<?php echo \$view['form']->widget(\$form, array('attr' => \$attr)) ?>
";
        
        $__internal_4021ff2bf23212e30f855209838b9bc6609202cdfeca9d53ddf53718b08f2625->leave($__internal_4021ff2bf23212e30f855209838b9bc6609202cdfeca9d53ddf53718b08f2625_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/collection_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php if (isset($prototype)): ?>*/
/*     <?php $attr['data-prototype'] = $view->escape($view['form']->row($prototype)) ?>*/
/* <?php endif ?>*/
/* <?php echo $view['form']->widget($form, array('attr' => $attr)) ?>*/
/* */
